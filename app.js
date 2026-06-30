/*****************************************************
 * Ma Collection Scanner
 * Version 1.1
 *****************************************************/

"use strict";

document.addEventListener("DOMContentLoaded", initialiser);

function initialiser() {

    console.log("Application démarrée");

    verifierCamera();

    document
        .getElementById("btnScanner")
        .addEventListener("click", lancerScanner);

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

    afficherInformation(
        "📷",
        "Demande d'autorisation..."
    );

    try {

        const flux = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        afficherSucces(
            "Caméra autorisée",
            "Le navigateur a accepté l'accès à la caméra."
        );

        // On coupe immédiatement la caméra.
        flux.getTracks().forEach(track => track.stop());

    }
    catch(e){

        afficherErreur(
            "Accès refusé",
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
