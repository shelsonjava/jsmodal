/*!
 * jsModal - A pure JavaScript modal dialog engine v1.0a
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
            settings = {},

            modalOverlay = document.createElement('div'),
            modalContainer = document.createElement('div'),
            modalHeader = document.createElement('div'),
            modalContent = document.createElement('div'),
            modalClose = document.createElement('div'),

            defaultSettings = {
                width: 'auto',
                height: 'auto',
                lock: false,
                hideclose: false,
                draggable: false
            };

        // Open the modal
        method.open = function(parameters) {
            settings.width = parameters.width || defaultSettings.width;
            settings.height = parameters.height || defaultSettings.height;
            settings.lock = parameters.lock || defaultSettings.lock;
            settings.hideclose = parameters.hideclose || defaultSettings.hideclose;
            settings.draggable = parameters.draggable || defaultSettings.draggable;

            modalContent.innerHTML = parameters.content;

            modalContainer.style.width = settings.width;
            modalContainer.style.height = settings.height;

            method.center({});

            if (settings.lock || settings.hideclose) {
                modalClose.style.visibility = 'hidden';
            }

            modalOverlay.style.visibility = 'visible';
            modalContainer.style.visibility = 'visible';

            document.onkeypress = function(e) {
                if (e.keyCode === 27 && settings.lock !== true) {
                    method.close();
                }
            };

            modalClose.onclick = function() {
                if (!settings.hideclose) {
                    method.close();
                } else {
                    return false;
                }
            };
            modalOverlay.onclick = function() {
                if (!settings.lock) {
                    method.close();
                } else {
                    return false;
                }
            };

            window.onresize = function() {
                method.center({ horizontalOnly: true });
            };

            if (settings.draggable === true) {
                modalHeader.style.cursor = 'move';
                modalHeader.onmousedown = function(e) {
                    method.drag(e);
                    return false;
                };
            } else {
                modalHeader.onmousedown = function() {
                    return false;
                }
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

                modalContainer.style.left = ((xPosition - differenceX) > 0) ? (xPosition - differenceX) + 'px' : 0 + 'px';
                modalContainer.style.top = ((yPosition - differenceY) > 0) ? (yPosition - differenceY) + 'px' : 0 + 'px';

                document.onmouseup = function() {
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
            modalHeader.style.cursor = 'default';
            modalClose.setAttribute('style', '');
            modalClose.style.cssText = '';
        };

        // Center the modal in the viewport
        method.center = function(parameters) {
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

            if (!parameters.horizontalOnly) {
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