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
let lecteur = null;

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
 * Scanner
 * (sera développé au bloc 2)
 *****************************************************/
function demarrerScanner() {

    console.log("Bouton Scanner");

    afficherInfo(
        "Scanner",
        "Initialisation..."
    );

}
