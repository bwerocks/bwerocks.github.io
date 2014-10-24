;(function(window, $, undefined) {

    var $body = $('body'),
        $contactForm = $('.js-contact-form'),
        contactFormComponents = {};

    function Spinner($parent) {
        this.$parent = $parent || $body;
        this.$spinner = $(
            '<div class="spinner">' +
                '<div class="double-bounce1"></div>' +
                '<div class="double-bounce2"></div>' +
            '</div>'
        );
    }

    Spinner.prototype = {
        init: function() {
            this.$parent.append(this.$spinner);

            return this;
        },
        show: function() {
            this.$spinner.fadeIn();

            return this;
        },
        hide: function() {
            this.$spinner.fadeOut();

            return this;
        }
    };

    Spinner.create = function($parent) {
        var instance = new Spinner($parent);

        return instance.init();
    };

    function Overlay($parent) {
        this.$parent = $parent || $body;
        this.$overlay = $('<div class="overlay">'); 
    }

    Overlay.prototype = {
        init: function() {
            this.$parent.append(this.$overlay);
            
            return this;
        },
        show: function() {
            this.$overlay.fadeIn();

            return this;
        },
        hide: function() {
            this.$overlay.fadeOut();

            return this;
        }
    };

    Overlay.create = function($parent) {
        var instance = new Overlay($parent);

        return instance.init();
    };

    $body.on('click', '[rel="external"]', function(e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    $contactForm.on('submit', function(e) {
        var $self = $(this),
            $required = $self.find(':input:not(:button)'),
            canSubmit = true;

        if(typeof contactFormComponents.overlay === 'undefined') {
            contactFormComponents.overlay = Overlay.create();
            contactFormComponents.spinner = Spinner.create();
            contactFormComponents.$message = $(
                '<div class="Form-Message">' +
                    '<div class="table">' +
                        '<div class="table__cell table__cell--v-align-middle">' +
                            'Sua mensagem foi recebida com sucesso!<br>' +
                            'Em breve entraremos em contato!' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }

        e.preventDefault();

        $required.each(function() {
            var $self = $(this);

            $self.removeClass('Form-Input--error');

            if(!$self.val()) {
                console.log($self);
                $self.addClass('Form-Input--error');
                canSubmit = false;
            }
        });

        if(canSubmit) {
            contactFormComponents.overlay.show();
            contactFormComponents.spinner.show();
            $.ajax({
                url: $self.attr('action'),
                data: $self.serialize(),
                type: 'post',
                dataType: 'xml',
                statusCode: {
                    0: function() {
                        contactFormComponents.overlay.hide();
                        contactFormComponents.spinner.hide();
                        $self.find(':input').
                            css('opacity', 0).
                            end().
                            append(
                            contactFormComponents.
                            $message.
                            hide().
                            fadeIn()
                        );
                    },
                    200: function() {
                        contactFormComponents.overlay.hide();
                        contactFormComponents.spinner.hide();
                        $self.find(':input').
                            css('opacity', 0).
                            end().
                            append(
                            contactFormComponents.
                            $message.
                            hide().
                            fadeIn()
                        );
                    }
                }
            });
        }
    });

}(window, jQuery));
