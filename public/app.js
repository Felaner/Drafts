$(function (){
    if ( $(window).width() > 767 ) {
        $(".small-image").click(function(){
            let img = $(this);
            let src = img.attr('src');
            $("body").append(
                "<div class='popup'>"+
                "<div class='popup_bg'></div>"+
                "<img src='"+src+"' class='popup_img' />"+
                "</div>"
            );
            $(".popup").fadeIn(200);
            $(".popup").click(function(){
                $(".popup").fadeOut(200);
                setTimeout(function() {
                    $(".popup").remove();
                }, 200);
            });
        });
    }
})

function selectedImg(el, index) {
    const img = $('img' + '[alt="' + el.alt + '"]')
    img.parent().parent().parent().parent().parent().parent()
        .find('#project' + index)[0].src = img.attr('src')
}

$(function() {
    $('.scrolling-arrow-left').click(function () {
        $('.scrolling-wrapper').animate({
            scrollLeft: '-=480'
        });
    })

    $('.scrolling-arrow-right').click(function () {
        $('.scrolling-wrapper').animate({
            scrollLeft: '+=480'
        });
    })
});

$(function () {
    $('.all-image-href').click(function () {
        const type = $(this).find('input').val()
        $('.nav-pills .nav-link').removeClass('active').attr('aria-selected', 'false')
        $('.tab-content .tab-pane').removeClass('show').removeClass('active')
        if (type === "Архитектурный макет") {
            $('#pills-arch-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-arch').addClass('show').addClass('active')
        } else if (type === "Концептуальный макет") {
            $('#pills-concept-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-concept').addClass('show').addClass('active')
        } else if (type === "Ландшафтный макет") {
            $('#pills-land-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-land').addClass('show').addClass('active')
        } else if (type === "Макет с интерактивной подсветкой") {
            $('#pills-inter-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-inter').addClass('show').addClass('active')
        } else if (type === "Подарочный макет") {
            $('#pills-gift-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-gift').addClass('show').addClass('active')
        } else if (type === "Промышленный макет") {
            $('#pills-prom-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-prom').addClass('show').addClass('active')
        } else if (type === "Прочее") {
            $('#pills-anything-tab').addClass('active').attr('aria-selected', 'true')
            $('#pills-anything').addClass('show').addClass('active')
        }
    })

    $('#archPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#conceptPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#landPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#interPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#giftPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#promPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#anyPortCarousel .carousel-indicators li').slice(0, 1).addClass('active')
    $('#archPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#conceptPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#landPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#interPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#giftPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#promPortCarousel .carousel-item').slice(0, 1).addClass('active')
    $('#anyPortCarousel .carousel-item').slice(0, 1).addClass('active')
})

$(function (){
    $('button.close').click(function () {
        $('#callForm')[0].reset();
    })

    $("#callForm").submit(function (e) {
        let $form = $(this)
        let result = true
        $("#callForm input.required").each(function (){
            if ($(this).val() === "") {
                $(this).focus().addClass('error-input');
                return result = false;
            }
        });
        if (result === false) {
            return false
        } else {
            let dataString =
                '&name='+ $('#callInputName').val() +
                '&phone=' + $('#callInputPhone').val() +
                '&areaMessage' + $('textarea#callTextareaMessage').val()

            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                error: function(jqXHR, textStatus, err) {
                    $('#callSubmittedMessageBox').html("<p style='color: red;'>Произошла ошибка</p>").fadeIn()
                    setTimeout(function () {
                        $('#callSubmittedMessageBox').fadeOut().text('')
                    }, 5000)
                },
                beforeSend: function() {
                    $('#callSubmittedMessageBox').html("<p style='color: #000000;'>Отправляем..</p>").fadeIn();
                },
                success: function(result) {
                    setTimeout(function () {
                        $('#callModal').modal('hide')
                    }, 5000);
                    $('#callForm')[0].reset();
                    $('#callSubmittedMessageBox').html("<p style='color: #000000;'>Заказ отправлен, вскоре с вами свяжется наш сотрудник</p>").fadeIn()
                    setTimeout(function () {
                        $('#callSubmittedMessageBox').fadeOut().text('');
                    }, 5000);
                }
            })
            e.preventDefault();
            return false;
        }
    })

    $('#form input.required, #callForm input.required').on('input focus blur', function () {
        if ($(this).val() === "") {
            $(this).addClass('error-input');
        }
        if ($(this).val() !== "") {
            $(this).removeClass('error-input');
        }
    })
    $('#form select.required').on('change', function () {
        if ($('option:selected', this).index() === 0) {
            $(this).addClass('error-input');
        }
        if ($('option:selected', this).index() > 0) {
            $(this).removeClass('error-input');
        }
    })

    $("#form").submit(function (e) {
        let $form = $(this)
        let result = true
        $form.find("input.required, select.required").each(function (){
            if ($(this).val() === "" ||
                $('option:selected', this).text() === "Выберите масштаб" ||
                $('option:selected', this).text() === "Выберите степень" ||
                $('option:selected', this).text() === "Выберите") {
                $(this).focus().addClass('error-input');
                return result = false;
            }
        });
        if (result === false) {
            return false
        } else {
            let dataString =
                '&name='+ $('#inputName').val() +
                '&contacts=' + $('#inputContacts').val() +
                '&object=' + $('#inputObject').val() +
                '&scale=' + $('#selectScale').val() +
                '&size=' + $('#inputSize').val() +
                '&detailing=' + $('#selectDetailing').val() +
                '&backlight=' + $('#selectBacklight').val() +
                '&glass=' + $('#selectGlass').val() +
                '&stand=' + $('#selectStand').val() +
                '&shipping=' + $('#selectShipping').val() +
                '&delivery=' + $('#selectDelivery').val() +
                '&areaMessage' + $('textarea#textareaMessage').val()

            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                error: function(jqXHR, textStatus, err) {
                    $('#submittedMessageBox').html("<p style='color: red;'>Произошла ошибка</p>").fadeIn()
                    setTimeout(function () {
                        $('#submittedMessageBox').fadeOut().text('')
                    }, 5000)
                },
                beforeSend: function() {
                    $('#submittedMessageBox').html("<p style='color: #000000;'>Отправляем..</p>").fadeIn();
                },
                success: function(result) {
                    $('#form')[0].reset();
                    $('#submittedMessageBox').html("<p style='color: #000000;'>Заказ отправлен, вскоре с вами свяжется наш сотрудник</p>").fadeIn()
                    setTimeout(function () {
                        $('#submittedMessageBox').fadeOut().text('');
                    }, 5000);
                }
            })
            e.preventDefault();
            return false;
        }
    })
})

!function(d,s){var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);js.async=1;js.src="//widget.flamp.ru/loader.js";fjs.parentNode.insertBefore(js,fjs);}(document,"script");
