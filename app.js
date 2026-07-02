"use strict";

/*****************************************************
 * Ma Collection
 * Version 2.1
 *****************************************************/


/*****************************************************
 * VARIABLES GLOBALES
 *****************************************************/

// Scanner ZXing
const lecteur = new ZXingBrowser.BrowserMultiFormatReader();

// Flux vidéo
let fluxVideo = null;

// Caméra ouverte ?
let cameraActive = false;

// Dernier code détecté
let dernierCode = "";

// Lecture autorisée ?
let lectureAutorisee = true;


/*****************************************************
 * INITIALISATION
 *****************************************************/

window.addEventListener("load", initialiser);

function initialiser() {

    console.log("================================");
    console.log("Ma Collection - Version 2.1");
    console.log("Initialisation...");
    console.log("================================");

    const bouton = document.getElementById("btnScanner");

    if (!bouton) {

        console.error("Bouton Scanner introuvable.");
        return;

    }

    bouton.addEventListener(
        "click",
        demarrerScanner
    );

    afficherResultat(
        "Application prête",
        "Appuyez sur « Scanner ».",
        "info"
    );

}


/*****************************************************
 * AFFICHAGE
 *****************************************************/

function afficherResultat(titre, texte, type = "info") {

    let icone = "ℹ️";

    switch(type){

        case "success":
            icone = "🟢";
            break;

        case "error":
            icone = "❌";
            break;

        case "warning":
            icone = "🟠";
            break;

    }

    document.getElementById("resultat").innerHTML = `
        <h2>${icone} ${titre}</h2>
        <p>${texte}</p>
    `;

}
/*****************************************************
 * CAMÉRA
 *****************************************************/

async function demarrerScanner() {

    if (cameraActive) {

        console.log("Caméra déjà ouverte.");
        return;

    }

    afficherResultat(
        "Caméra",
        "Ouverture...",
        "info"
    );

    try {

        const video =
            document.getElementById("camera");

        fluxVideo =
            await navigator.mediaDevices.getUserMedia({

                video:{
                    facingMode:{
                        ideal:"environment"
                    }
                },

                audio:false

            });

        video.srcObject = fluxVideo;

        await video.play();

        cameraActive = true;

        afficherResultat(
            "Caméra",
            "Caméra ouverte.",
            "success"
        );

        lancerLecture();

    }

    catch(erreur){

        console.error(erreur);

        afficherResultat(
            "Erreur caméra",
            erreur.message,
            "error"
        );

    }

}
/*****************************************************
 * ZXING
 *****************************************************/

async function lancerLecture() {

    console.log("Lecture démarrée...");

    const video =
        document.getElementById("camera");

    try {

        await lecteur.decodeFromVideoElement(

            video,

            (result, erreur) => {

                if (!result) return;

                if (!lectureAutorisee) return;

                const code = result.getText();

                if (code === dernierCode) return;

                lectureAutorisee = false;

                dernierCode = code;

                if (navigator.vibrate) {

                    navigator.vibrate(150);

                }

                console.log("Code :", code);

                traiterCode(code);

                setTimeout(() => {

                    lectureAutorisee = true;

                }, CONFIG.DELAI_SCAN);

            }

        );

    }

    catch(erreur){

        console.error(erreur);

        afficherResultat(
            "Erreur scanner",
            erreur.message,
            "error"
        );

    }

}
/*****************************************************
 * TRAITEMENT D'UN CODE
 *****************************************************/

async function traiterCode(code){

    afficherResultat(
        "Recherche...",
        "Connexion à votre collection...",
        "info"
    );

 try {

    const url =
        CONFIG.APPS_SCRIPT_URL +
        "?code=" +
        encodeURIComponent(code);

    console.log("URL :", url);

    const reponse = await fetch(url);

    console.log("Status :", reponse.status);
    console.log("URL finale :", reponse.url);
    console.log("Type :", reponse.type);

    const texte = await reponse.text();

    console.log("Réponse :", texte);

}
catch(erreur){

    console.error(erreur);

    afficherResultat(
        "Erreur",
        erreur.message,
        "error"
    );

}

}
