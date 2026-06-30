/*****************************************************
 * Ma Collection Scanner
 * Version 1.1
 *****************************************************/

"use strict";

let video = null;
let fluxCamera = null;

document.addEventListener("DOMContentLoaded", initialiser);

function initialiser() {

    console.log("Application démarrée");

    verifierCamera();
    verifierBarcodeDetector();
    
    document
        .getElementById("btnScanner")
        .addEventListener("click", lancerScanner);

}

/*****************************************************
 * Vérifie le support de BarcodeDetector
 *****************************************************/
function verifierBarcodeDetector() {

    if ("BarcodeDetector" in window) {

        console.log("✅ BarcodeDetector disponible");

        afficherInformation(
            "✅",
            "BarcodeDetector disponible"
        );

    } else {

        console.log("❌ BarcodeDetector indisponible");

        afficherInformation(
            "⚠️",
            "BarcodeDetector indisponible"
        );

    }

}

/*****************************************************
 * Vérifie si la caméra est disponible
 *****************************************************/
function verifierCamera() {

    if (!navigator.mediaDevices) {

        afficherErreur(
            "Caméra non supportée",
            "Votre navigateur ne permet pas d'utiliser la caméra."
        );

        return;
    }

    afficherInformation(
        "📷",
        "Caméra disponible. Prête à être utilisée."
    );

}


/*****************************************************
 * Bouton Scanner
 *****************************************************/
async function lancerScanner() {

    try{

        fluxCamera = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"environment"
            }

        });

        video = document.getElementById("camera");

        video.srcObject = fluxCamera;

        video.style.display = "block";

        afficherSucces(

            "Caméra ouverte",

            "Prête à scanner un code-barres."

        );

    }

    catch(e){

        afficherErreur(

            "Impossible d'ouvrir la caméra",

            e.name

        );

        console.error(e);

    }

}

/*****************************************************
 * Affichage
 *****************************************************/
function afficherInformation(icone, texte){

    document.getElementById("resultat").innerHTML = `
        <h2 class="info">${icone} ${texte}</h2>
    `;
}

function afficherSucces(titre, texte){

    document.getElementById("resultat").innerHTML = `
        <h2 class="success">🟢 ${titre}</h2>
        <p>${texte}</p>
    `;
}

function afficherErreur(titre, texte){

    document.getElementById("resultat").innerHTML = `
        <h2 class="error">🔴 ${titre}</h2>
        <p>${texte}</p>
    `;
}
