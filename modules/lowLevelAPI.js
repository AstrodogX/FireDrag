/**
 * Created by erictsangx on 23/11/2015.
 */

const {Cu} = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');
const prefs = require('sdk/simple-prefs').prefs;


module.exports = {
    rechercheHautGauche: (content) => {
        return Services.search.getEngineByName(prefs.moteurHautGauche).getSubmission(content).uri.spec;
    },
    rechercheHaut: (content) => {
        return Services.search.getEngineByName(prefs.moteurHaut).getSubmission(content).uri.spec;
    },
    rechercheHautDroite: (content) => {
        return Services.search.getEngineByName(prefs.moteurHautDroite).getSubmission(content).uri.spec;
    },
    rechercheDroite: (content) => {
        return Services.search.getEngineByName(prefs.moteurDroite).getSubmission(content).uri.spec;
    },
    rechercheBasDroite: (content) => {
        return Services.search.getEngineByName(prefs.moteurBasDroite).getSubmission(content).uri.spec;
    },
    rechercheBas: (content) => {
        return Services.search.getEngineByName(prefs.moteurBas).getSubmission(content).uri.spec;
    },
    rechercheBasGauche: (content) => {
        return Services.search.getEngineByName(prefs.moteurBasGauche).getSubmission(content).uri.spec;
    },
    rechercheGauche: (content) => {
        return Services.search.getEngineByName(prefs.moteurGauche).getSubmission(content).uri.spec;
    },
    getSearchEngine: (name) => {
        return Services.search.getEngineByName(name);
    },
    getDefaultEngine: ()=> {
        return Services.search.getDefaultEngineInfo();
    },
    getAllSearchEngines: ()=> {
        const array = [];
        Services.search.getEngines().forEach((element)=> {
            array.push(element.name);
        });
        return array;
    }
};