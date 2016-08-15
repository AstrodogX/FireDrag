/**
 * Created by erictsangx on 5/10/2015.
 */

'use strict';

const self = require('sdk/self');
const pageMods = require('sdk/page-mod');
const tabs = require('sdk/tabs');
const clipboard = require("sdk/clipboard");
const notifications = require("sdk/notifications");
const prefs = require('sdk/simple-prefs').prefs;
const lowLevelAPI = require('./modules/lowLevelAPI');
const data = self.data;
require('./modules/preference');

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url('dropHandler.js'),
    contentScriptWhen: 'start',
    onAttach: startListening
});

function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.distance >= prefs.distance && (prefs.dernierY !== msg.finY || prefs.dernierX !== msg.finX)) {
            var condition = "";
            prefs.dernierY = msg.finY;
            prefs.dernierX = msg.finX;
            if (msg.contentLink) {
                var texte = false;
                var content = msg.contentLink;
            } else if (msg.contentText) {
                var texte = true;
                var content = msg.contentText;
            }
            var angle = msg.angle;
            var direction = "autre";
            if (angle >= 340 || angle <= 20) {
                direction = "gauche";
            } else if (angle >= 21 && angle <= 69) {
                direction = "hautgauche";
            } else if (angle >= 70 && angle <= 110) {
                direction = "haut";
            } else if (angle >= 111 && angle <= 159) {
                direction = "hautdroite";
            } else if (angle >= 160 && angle <= 200) {
                direction = "droite";
            } else if (angle >= 201 && angle <= 249) {
                direction = "basdroite";
            } else if (angle >= 250 && angle <= 290) {
                direction = "bas";
            } else if (angle >= 291 && angle <= 339) {
                direction = "basgauche";
            }
            
            if (content.startsWith(' ') && prefs.supprimerEspace.indexOf('debut') !== -1) {
                content = content.substr(1);
            }
            if (content.endsWith(' ') && prefs.supprimerEspace.indexOf('fin') !== -1) {
                content = content.substr(0, content.length-1);
            }
            
            if (texte && prefs.lienTexte) {
                if (content.startsWith('http')) {
                    texte = false;
                } else if (content.startsWith('www.') || (content.match(("\\." + prefs.domaines).replace(/ /g, "|\\.")) !== null && (content.indexOf(' ') == -1))) {
                    content = "http://" + content;
                    texte = false;
                } else if (content == "about:" || (content.indexOf('about:') !== -1 && content.split(':').length == 2 && content.indexOf(' ') == -1)) {
                    texte = false;
                }
            }

            if (direction === "hautgauche") {
                if (texte) {
                    content = lowLevelAPI.rechercheHautGauche(content);
                    condition = prefs.actionHautGaucheTexte;
                } else {
                    condition = prefs.actionHautGauche;
                }
            } else if (direction === "haut") {
                if (texte) {
                    content = lowLevelAPI.rechercheHaut(content);
                    condition = prefs.actionHautTexte;
                } else {
                    condition = prefs.actionHaut;
                }
            } else if (direction === "hautdroite") {
                if (texte) {
                    content = lowLevelAPI.rechercheHautDroite(content);
                    condition = prefs.actionHautDroiteTexte;
                } else {
                    condition = prefs.actionHautDroite;
                }
            } else if (direction === "droite") {
                if (texte) {
                    content = lowLevelAPI.rechercheDroite(content);
                    condition = prefs.actionDroiteTexte;
                } else {
                    condition = prefs.actionDroite;
                }
            } else if (direction === "gauche") {
                if (texte) {
                    content = lowLevelAPI.rechercheGauche(content);
                    condition = prefs.actionGaucheTexte;
                } else {
                    condition = prefs.actionGauche;
                }
            } else if (direction === "basgauche") {
                if (texte) {
                    content = lowLevelAPI.rechercheBasGauche(content);
                    condition = prefs.actionBasGaucheTexte;
                } else {
                    condition = prefs.actionBasGauche;
                }
            } else if (direction === "bas") {
                if (texte) {
                    content = lowLevelAPI.rechercheBas(content);
                    condition = prefs.actionBasTexte;
                } else {
                    condition = prefs.actionBas;
                }
            } else if (direction === "basdroite") {
                if (texte) {
                    content = lowLevelAPI.rechercheBasDroite(content);
                    condition = prefs.actionBasDroiteTexte;
                } else {
                    condition = prefs.actionBasDroite;
                }
            } else {
                // clipboard.set(direction);
                notifications.notify({
                    title: direction,
                });
            }
            if (condition === "actuel") {
                tabs.activeTab.url = content;
            } else if (condition === "arriere") {
                tabs.open({
                    url: content,
                    inBackground: true,
                    onOpen: onOpen,
                });
            } else if (condition === "premier") {
                tabs.open({
                    url: content,
                    inBackground: false,
                    onOpen: onOpen,
                });
            } else if (condition === "copier") {
                clipboard.set(content);
                notifications.notify({
                    title: "Texte copié !",
                    text: content,
                });
            }
        }
    });
}

function onOpen(tab) {
    if (prefs.ongletPlace) {
        tab.index = tabs.activeTab.index + 1;
    }
}