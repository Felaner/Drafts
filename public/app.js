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

$(function (){
    $("#form").submit(function (e) {
        let $form = $(this)
        let result = true
        $("input.required").each(function (){
            if ($(this).val() === "") {
                $(this).focus().addClass('error-input');
                return result = false;
            }
        });
        if (result === false) {
            return false
        } else {
            let dataString =
                '&name='+ $('#inputName').val() +
                '&phone=' + $('#inputPhone').val() +
                '&areaMessage' + $('textarea#textareaMessage').val()

            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                error: function(jqXHR, textStatus, err) {
                    $('#submittedMessageBox').html("<p style='color: red'>Произошла ошибка</p>").fadeIn()
                    setTimeout(function () {
                        $('#submittedMessageBox').fadeOut().text('')
                    }, 5000)
                },
                beforeSend: function() {
                    $('#submittedMessageBox').html("<p style='color: #000000'>Отправляем..</p>").fadeIn();
                },
                success: function(result) {
                    $('#form')[0].reset();
                    $('#submittedMessageBox').html("<p style='color: #000000'>Заказ отправлен, вскоре с вами свяжется наш сотрудник</p>").fadeIn()
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
