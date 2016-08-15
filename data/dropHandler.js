/**
 * Created by erictsangx on 5/10/2015.
 */

(function () {
    'use strict';
    const start = {};
    const end = {};
    let distance = 0;
    let dropOnInput = false;
    
    this.addEventListener('dragstart', event => {
        start.x = event.clientX;
        start.y = event.clientY;
    }, false);

    this.addEventListener('dragend', event => {
        if (!dropOnInput && end.y != undefined && end.x != undefined) {
            event.preventDefault();
            const emitObj = {
                contentLink: event.dataTransfer.getData('URL'),
                contentText: event.dataTransfer.getData('text'),
                distance: distance,
                angle: Math.round((Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI)+180),
                finY: end.y,
                finX: end.x
            };
            self.port.emit('triggerDrop', emitObj);
        }
    });

    this.ondrop = (event) => {
        end.x = event.clientX;
        end.y = event.clientY;
        if (event.target.nodeName == 'INPUT') {
            dropOnInput = true;
        } else {
            distance = Math.hypot(end.x - start.x, end.y - start.y);
            dropOnInput = false;
            event.preventDefault();
        }
    };

    this.ondragover = (event)=> {
        event.preventDefault();
    };

}).call(document);