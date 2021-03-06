'use strict'

const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2/promise');
const csrf = require('csurf');

const sequelize = require('./utils/database')

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const fileMiddleware = require('./middleware/file')

const path = require('path');

const app = express();

const homeRoute = require('./routes/home');
const advantageRoute = require('./routes/advantage');
const otzyvyRoute = require('./routes/otzyvy');
const contactsRoute = require('./routes/contacts');
const layoutsRoute = require('./routes/layouts');
const draftsRoute = require('./routes/drafts');
const portfolioRoute = require('./routes/portfolio');
const adminRoute = require('./routes/admin');

const errorHandler = require('./middleware/error');

const keys = require('./keys');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./utils/hbs-helpers')
});

const options = {
    host: '127.0.0.1',
    port: 3306,
    user: keys.DATABASE_USER,
    password: keys.DATABASE_PASS,
    database: keys.DATABASE_NAME,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

const connection = mysql.createPool(options);
const sessionStore = new MySQLStore(options);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

app.use(flash());

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    path: '/',
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}));

app.use(fileMiddleware.fields([
    { name: 'projectImages', maxCount: 15 },
    { name: 'projectImagesEdit', maxCount: 15 }
]));

app.use(userMiddleware);
app.use(varMiddleware);

app.use('/', homeRoute);
app.use('/preimushchestva', advantageRoute);
app.use('/otzyvy', otzyvyRoute);
app.use('/kontakty', contactsRoute);
app.use('/makety', layoutsRoute);
app.use('/chertezhi', draftsRoute);
app.use('/portfolio', portfolioRoute);
app.use('/admin', adminRoute);

app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (e) {
        console.dir(e);
    }
}

start();