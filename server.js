'use strict'

const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser')

const path = require('path');

const app = express();

const homeRoute = require('./routes/home');
const advantageRoute = require('./routes/advantage');
const otzyvyRoute = require('./routes/otzyvy');
const contactsRoute = require('./routes/contacts');
const layoutsRoute = require('./routes/layouts');
const draftsRoute = require('./routes/drafts');
const portfolioRoute = require('./routes/portfolio');
// const adminRoute = require('./routes/admin'); АДМИНКА

const errorHandler = require('./middleware/error');

const keys = require('./keys');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoute);
app.use('/preimushchestva', advantageRoute);
app.use('/otzyvy', otzyvyRoute);
app.use('/kontakty', contactsRoute);
app.use('/makety', layoutsRoute);
app.use('/chertezhi', draftsRoute);
app.use('/portfolio', portfolioRoute);
// app.use('/admin', adminRoute); АДМИНКА

app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (e) {
        console.dir(e);
    }
}

start();