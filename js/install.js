let deferredInstallPrompt = null;
const installButton = document.getElementById('btnInstall');
installButton.addEventListener('click', installPWA);


window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
// CODELAB: Add event listener for beforeinstallprompt event
/**
* Event handler for beforeinstallprompt event.
* Saves the event & shows install button.
*
* @param {Event} evt
*/
function saveBeforeInstallPromptEvent(evt) {
//CODELAB: Add code to save event & show the install button
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');

}



/**
* Event handler for butInstall - Does the PWA installation.
*
* @param {Event} evt
*/
function installPWA(evt) {
    // Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true);
    // Log user response to prompt.
    deferredInstallPrompt.userChoice
    .then((choice) => {
    if (choice.outcome === 'accepted') {
    console.log('utilisateur à installé la web app via mon boutton', choice);
    } else {
    console.log('Usager à installer la PWA', choice);
    }
    deferredInstallPrompt = null;
    });
    }
    // CODELAB: Add event listener for appinstalled event
    /**
    * Event handler for appinstalled event.
    * Log the installation to analytics or save the event somehow.
    *
    * @param {Event} evt
    */
     function logAppInstalled(evt) {
        // Add code to log the event
        console.log('utilisateur à installé la web app via les 3 petits points de chrome', evt);
        }