/**
 * Created by erictsangx on 23/11/2015.
 */

'use strict';

const self = require('sdk/self');
const Panel = require('sdk/panel').Panel;
const sp = require('sdk/simple-prefs');
const lowLevelAPI = require('./lowLevelAPI');
const data = self.data;

var engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurGauche);
if (engine === null) {
    sp.prefs.moteurGauche = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurDroite);
if (engine === null) {
    sp.prefs.moteurDroite = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurHautGauche);
if (engine === null) {
    sp.prefs.moteurHautGauche = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurHaut);
if (engine === null) {
    sp.prefs.moteurHaut = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurHautDroite);
if (engine === null) {
    sp.prefs.moteurHautDroite = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurBasDroite);
if (engine === null) {
    sp.prefs.moteurBasDroite = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurBas);
if (engine === null) {
    sp.prefs.moteurBas = lowLevelAPI.getDefaultEngine().name;
}
engine = lowLevelAPI.getSearchEngine(sp.prefs.moteurBasGauche);
if (engine === null) {
    sp.prefs.moteurBasGauche = lowLevelAPI.getDefaultEngine().name;
}

sp.on('moteurGaucheBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurGauche});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurGauche = msg;
    });

    panel.show();
});
sp.on('moteurDroiteBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurDroite});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurDroite = msg;
    });

    panel.show();
});
sp.on('moteurHautGaucheBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurHautGauche});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurHautGauche = msg;
    });

    panel.show();
});
sp.on('moteurHautBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurHaut});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurHaut = msg;
    });

    panel.show();
});
sp.on('moteurHautDroiteBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurHautDroite});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurHautDroite = msg;
    });

    panel.show();
});
sp.on('moteurBasGaucheBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurBasGauche});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurBasGauche = msg;
    });

    panel.show();
});
sp.on('moteurBasBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurBas});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurBas = msg;
    });

    panel.show();
});
sp.on('moteurBasDroiteBtn', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.moteurBasDroite});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.moteurBasDroite = msg;
    });

    panel.show();
});