const form = document.getElementById('form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const message2 = document.getElementById('message2');






const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(input_str) {
    const re2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re2.test(input_str);
}

const validateInputs = () => {
    const prenomValue = prenom.value.trim();
    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const message2Value = message2.value.trim();
    const phoneValue = phone.value.trim();
    let noError = true;
    

    if(prenomValue === '') {
        setError(prenom, 'prénom requis');
        noError =false;
    } else {
        setSuccess(prenom);
    }

    if(nomValue === '') {
        setError(nom, 'nom requis');
        noError =false;
    } else {
        setSuccess(nom);
    }
    if(phoneValue === '') {
        setError(phone, 'téléphone requis');
        noError =false;
    } else if (!validatePhoneNumber(phoneValue)){
        setError(phone , 'SVP mettre un téléphone valide');
        noError =false;
    } else {

        setSuccess(phone)
    }

    if(emailValue === '') {
        setError(email, 'Un courriel est requis');
        noError =false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'SVP mettre une adresse courriel valide');
        noError =false;
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Un mot de passe est requis');
        noError =false;
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Le mot de passe doit avoir 8 caractères.')
        noError =false;
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Merci de confirmer votre mot de passe');
        noError =false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Mot de passe ne corresponde pas");
        noError =false;
    } else {
        setSuccess(password2);
    }
    if(message2Value === '') {
        setError(message2, 'Entrez un commentaire SVP');
        noError =false;
    } else {
        setSuccess(message2);
    } 

    return noError;
    
};
