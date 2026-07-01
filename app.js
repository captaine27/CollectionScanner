"use strict";

/*****************************************************
 * Variables globales
 *****************************************************/
let lecteur = null;
let dernierCode = "";
let scannerEnCours = false;
let codeReader = null;
let cameraActive = false;

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
/*****************************************************
 * Démarrage du scanner ZXing
 *****************************************************/
async function demarrerScanner() {

    if (cameraActive) return;

    cameraActive = true;

    afficherInfo(
        "📷 Caméra",
        "Recherche d'un code-barres..."
    );

    codeReader = new ZXing.BrowserMultiFormatReader();

    try {

        const videoInputDevices =
            await codeReader.listVideoInputDevices();

        if(videoInputDevices.length === 0){

            afficherInfo(
                "Erreur",
                "Aucune caméra trouvée."
            );

            cameraActive = false;
            return;

        }

        await codeReader.decodeFromVideoDevice(

            null,

            "camera",

            (result, err) => {

                if(result){

                    const code = result.getText();

                    if(code !== dernierCode){

                        dernierCode = code;

                        navigator.vibrate?.(150);

                        afficherSucces(code);

                    }

                }

            }

        );

    }

    catch(e){

        console.error(e);

        afficherInfo(
            "Erreur",
            e.message
        );

        cameraActive = false;

    }

}
