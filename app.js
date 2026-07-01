"use strict";

/*****************************************************
 * Variables globales
 *****************************************************/
let lecteur = null;
let dernierCode = "";
let scannerEnCours = false;

/*****************************************************
 * Initialisation
 *****************************************************/
window.addEventListener("load", initialiser);

function initialiser() {

    console.log("Application démarrée");

    document
        .getElementById("btnScanner")
        .addEventListener("click", demarrerScanner);

    afficherInfo(
        "Application prête",
        "Appuyez sur Scanner."
    );

}
function afficherInfo(titre, texte){

    document.getElementById("resultat").innerHTML = `
        <h2>${titre}</h2>
        <p>${texte}</p>
    `;

}

function afficherSucces(code){

    document.getElementById("resultat").innerHTML = `
        <h2>✅ Code détecté</h2>
        <p>${code}</p>
    `;

}
