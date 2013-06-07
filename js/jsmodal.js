/*!
 * jsModal - A pure JavaScript modal dialog engine v1.0
 * http://jsmodal.com/
 *
 * Author: Henry Rune Tang Kai <henry@henrys.se>
 *
 * (c) Copyright 2013 Henry Tang Kai.
 *
 * License: http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2013-6-07
 */

var Modal = (function() {
        "use strict";
        /*global document: false */
        /*global window: false */

         // create object method
        var method = {},

            modalOverlay = document.createElement('div'),
            modalContainer = document.createElement('div'),
            modalHeader = document.createElement('div'),
            modalContent = document.createElement('div'),
            modalClose = document.createElement('div'),

            parameters = {
                width: 'auto',
                height: 'auto',
                lock: false,
                hideclose: false,
                draggable: false
            };

        // Open the modal
        method.open = function(settings) {
            parameters.width = settings.width || parameters.width;
            parameters.height = settings.height || parameters.height;
            parameters.lock = settings.lock || parameters.lock;
            parameters.hideclose = settings.hideclose || parameters.hideclose;
            parameters.draggable = settings.draggable || parameters.draggable;

            modalContent.innerHTML = settings.content;

            modalContainer.style.width = parameters.width;
            modalContainer.style.height = parameters.height;

            method.center({});

            if (parameters.lock || parameters.hideclose) {
                modalClose.style.visibility = 'hidden';
            }

            modalOverlay.style.visibility = 'visible';
            modalContainer.style.visibility = 'visible';

            document.onkeypress = function(e) {
                if (e.keyCode === 27 && parameters.lock !== true) {
                    method.close();
                }
            };

            modalClose.onclick = function() {
                if (!parameters.hideclose) {
                    method.close();
                } else {
                    return false;
                }
            };
            modalOverlay.onclick = function() {
                if (!parameters.lock) {
                    method.close();
                } else {
                    return false;
                }
            };

            window.onresize = function() {
                method.center({ horizontalOnly: true });
            };

            if (parameters.draggable === true) {
                modalHeader.onmousedown = function(e) {
                    method.drag(e);
                    return false;
                };
            }
        };

        method.drag = function(e) {
            var xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX,
                yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY,
                differenceX = xPosition - modalContainer.offsetLeft,
                differenceY = yPosition - modalContainer.offsetTop;

            document.onmousemove = function(e) {
                xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX;
                yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY;

                modalContainer.style.left = xPosition - differenceX + 'px';
                modalContainer.style.top = yPosition - differenceY + 'px';

                this.onmouseup = function() {
                    window.document.onmousemove = null;
                };
            };
        };

        // Close the modal
        method.close = function() {
            modalContent.innerHTML = '';
            modalOverlay.setAttribute('style', '');
            modalOverlay.style.cssText = '';
            modalOverlay.style.visibility = 'hidden';
            modalContainer.setAttribute('style', '');
            modalContainer.style.cssText = '';
            modalContainer.style.visibility = 'hidden';
            modalClose.setAttribute('style', '');
            modalClose.style.cssText = '';
            parameters.width = 'auto';
            parameters.height = 'auto';
            parameters.lock = false;
            parameters.hideclose = false;
            parameters.draggable = false;
        };

        // Center the modal in the viewport
        method.center = function(settings) {
            var documentHeight =  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),

                modalWidth = Math.max(modalContainer.clientWidth, modalContainer.offsetWidth),
                modalHeight = Math.max(modalContainer.clientHeight, modalContainer.offsetHeight),

                windowWidth = Math.max(
                    Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
                    Math.max(document.body.clientWidth, document.documentElement.clientWidth)
                ),

                windowHeight = Math.max(
                    Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
                    Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                ),

                top = (windowHeight - modalHeight) / 2,
                left = (windowWidth - modalWidth) / 2,

                scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            if (!settings.horizontalOnly) {
                modalContainer.style.top = top + scrollTop + 'px';
            }

            modalContainer.style.left = left + 'px';

            modalOverlay.style.height = documentHeight + 'px';
            modalOverlay.style.width = '100%';
        };

        // Set the id's and append them accordingly and to the document body
        modalOverlay.setAttribute('id', 'modal-overlay');
        modalContainer.setAttribute('id', 'modal-container');
        modalHeader.setAttribute('id', 'modal-header');
        modalContent.setAttribute('id', 'modal-content');
        modalClose.setAttribute('id', 'modal-close');
        modalHeader.appendChild(modalClose);
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalContent);

        modalOverlay.style.visibility = 'hidden';
        modalContainer.style.visibility = 'hidden';

        window.onload = function() {
            document.body.appendChild(modalOverlay);
            document.body.appendChild(modalContainer);
        };

        return method;
    }());