/*!
 * Name:        Embed-doc
 * Version:     1.2.0
 * Description: library javascript to embed a documentation on application
 * Author:      W1773ND
 * Support:     http://ikwen.com
 *
 * Depends:     jquery_3.js http://jquery.org
 *
 *
 * Date: Sat Feb 24 07:55:29 2018
 */

(function(w) {
    var c = function(){
        return new c.fn.init()
    };

    c.fn = c.prototype = {
        init: function(){return this}
    };

    c.initEmbedDoc = function (remindText, gotItText, showHelpText) {
        let slideCount = $('.embed-doc-page').length;
        if (slideCount === 0) return;

        if (!remindText) {
            remindText = "Remind me later"
        }

        if(!gotItText) {
            gotItText = "Got it"
        }

        if(!showHelpText) {
            showHelpText = "Show help"
        }
        let $modal = $('<div id="embed-doc-modal" class="modal embed-doc-modal" tabindex="-1" role="dialog">' +
                        '<div class="modal-dialog embed-doc-modal-dialog" role="document">' +
                            '<div class="modal-content embed-doc-modal-content">' +
                                '<div class="modal-header embed-doc-modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '</div>' +
                                '<div class="modal-body embed-doc-modal-body">' +
                                    '<div class="swiper-container">' +
                                        '<div class="swiper-wrapper">' +
                                            '<div class="swiper-slide tpl">' +
                                                '<div class="row">' +
                                                    '<div class="col-lg-5 col-sm-4" >' +
                                                        '<img class="img-responsive tips-img" src="" />' +
                                                    '</div>' +
                                                    '<div class="col-lg-7 col-sm-8">' +
                                                        '<h2 class="embed-doc-page-title"></h2>' +
                                                            '<p class="tips-text"></p>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +

                                '</div>' +
                                '<div class="modal-footer embed-doc-modal-footer">' +
                                    '<button type="button" class="btn btn-default btn-embed-doc-remind" data-dismiss="modal">' + remindText + '</button>' +
                                    '<button type="button" class="btn btn-primary btn-embed-doc-got-it" data-dismiss="modal">' + gotItText + '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div  data-toggle="modal" data-target="#embed-doc-modal" class="embed-doc-show-help" title="' + showHelpText + '">' +
                        '<span class="glyphicon glyphicon-book"></span>' +
                    '</div>');

        $modal.insertAfter('.embed-doc');

        $('.embed-doc-page').each(function(){
             let $slide = $modal.find('.swiper-slide:first').clone().removeClass('tpl'),
                 img = $(this).data('img'),
                 title = $(this).data('title'),
                 text = $(this).text();

             $slide.find('.tips-img').attr('src', img);
             $slide.find('.embed-doc-page-title').text(title);
             $slide.find('.tips-text').text(text);
             $slide.appendTo('#embed-doc-modal .swiper-wrapper')
        });

        if(slideCount > 1 ) {
            let $arrows = $('<div class="swiper-button-next"></div>' +
                            '<div class="swiper-button-prev"></div>');
            $arrows.insertAfter('#embed-doc-modal .swiper-container')
        }

        //Initialize Swiper
         let swiper = new Swiper('#embed-doc-modal .swiper-container', {
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
        // end Initialize Swiper

        let uri = window.location.pathname;
        if (!localStorage.getItem(uri + 'gotIt'))
            $('.embed-doc-show-help').click();
        else
            $('.btn-embed-doc-remind').addClass('tpl');

        $('.btn-embed-doc-got-it').click(function(){
            localStorage.setItem(uri + 'gotIt', 'yes')
        });

        $('.embed-doc').remove();
    };
    w.embedDoc = c;
})(window);