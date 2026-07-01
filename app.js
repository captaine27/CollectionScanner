"use strict";

/*****************************************************
 * Ma Collection
 * Version 2.0
 * Bloc 1 : Initialisation
 *****************************************************/


/*****************************************************
 * Variables globales
 *****************************************************/

// Scanner ZXing
let lecteur = new ZXingBrowser.BrowserMultiFormatReader();

// Caméra active ?
let cameraActive = false;

// Flux vidéo
let fluxVideo = null;

// Dernier code lu
let dernierCode = "";

// Lecture autorisée ?
let lectureAutorisee = true;


/*****************************************************
 * Initialisation
 *****************************************************/
window.addEventListener("load", initialiser);

function initialiser() {

    console.log("=== Ma Collection ===");
    console.log("Initialisation...");

    const bouton =
        document.getElementById("btnScanner");

    if (!bouton) {

        console.error("Bouton Scanner introuvable");
        return;

    }

    bouton.addEventListener(
        "click",
        demarrerScanner
    );

    afficherInfo(
        "Application prête",
        "Appuyez sur « Scanner »."
    );

}


/*****************************************************
 * Affichage
 *****************************************************/
function afficherInfo(titre, texte) {

    document.getElementById("resultat").innerHTML = `
        <h2>${titre}</h2>
        <p>${texte}</p>
    `;

}


function afficherSucces(code) {

    document.getElementById("resultat").innerHTML = `
        <h2>✅ Code détecté</h2>
        <p>${code}</p>
    `;

}


/*****************************************************
 * Démarrage de la caméra
 *****************************************************/
async function demarrerScanner() {

    if (cameraActive) return;

    try {

        afficherInfo(
            "📷 Caméra",
            "Ouverture..."
        );

        const video =
            document.getElementById("camera");

        fluxVideo =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: {
                        ideal: "environment"
                    }
                },

                audio: false

            });

        video.srcObject = fluxVideo;

        await video.play();

        cameraActive = true;
        lancerLecture();
        afficherInfo(
            "📷 Caméra",
            "Caméra ouverte."
        );

    }

    catch(e){

        console.error(e);

        afficherInfo(
            "Erreur",
            e.message
        );

    }
    }
    
    async function lancerLecture() {

    const video = document.getElementById("camera");

    try {

        await lecteur.decodeFromVideoElement(
            video,
            (result, err) => {

                if (!result) return;

                const code = result.getText();

                if (code === dernierCode) return;

                dernierCode = code;

                if (navigator.vibrate) {
                    navigator.vibrate(150);
                }

                rechercherDansCollection(code);

                console.log(code);

            }
        );

    } catch(e) {

        console.error(e);

    }

}

}async function rechercherDansCollection(code) {

 afficherInfo(
    "🔍 Recherche dans votre collection...",
    "Connexion à Google Sheets..."
);

    try {

        const url =
            CONFIG.APPS_SCRIPT_URL +
            "?code=" +
            encodeURIComponent(code);

        const reponse = await fetch(url);

        const resultat = await reponse.json();

        console.log(resultat);

    }
    catch(erreur){

        console.error(erreur);

        afficherErreur(
            "Impossible de contacter Google Sheets."
        );

    }

}
function afficherErreur(message) {

    document.getElementById("resultat").innerHTML = `
        <h2>❌ Erreur</h2>
        <p>${message}</p>
    `;

}
