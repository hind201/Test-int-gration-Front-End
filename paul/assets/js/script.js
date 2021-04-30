////////////////////////////////////Animation Input



const textInputElements = document.querySelectorAll('.textfield__text-input');
textInputElements.forEach((textInput) => {
    textInput.addEventListener('focus', () => {
        textInput
            .classList
            .add('textfield__text-input--active');
    });
    textInput.addEventListener('blur', () => {
        if (!textInput.value.length > 0) {
            textInput
                .classList
                .remove('textfield__text-input--active');
        }
    });
});

//////////////Validation form///////////////////////////////////////

const formInputs = [...document.querySelectorAll('.form-control input')];
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const motdepasse = document.getElementById('mot de passe');
const confmotdepasse = document.getElementById('confirmation de mot de passe');
const form = document.getElementById('form');
/*for label of inputs*/
formInputs.forEach((formInput) => {
    formInput.addEventListener('focusin', formInputFocusInHandler);
    formInput.addEventListener('focusout', formInputFocusOutHandler);
});

function formInputFocusInHandler() {
    const label = this
        .parentElement
        .querySelector('label');
    label
        .classList
        .add('active');
}

function formInputFocusOutHandler() {
    if (this.value === '') {
        const label = this
            .parentElement
            .querySelector('label');
        label
            .classList
            .remove('active');
    }
}

/*for form validation*/

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequire([nom, email, motdepasse, confmotdepasse]);
    checkEmail(email);
    checkMatch(motdepasse, confmotdepasse);
});

function checkEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email non valide');
    }
}

function showError(input, message) {
    const parent = input.parentElement;
    const smallTag = parent.querySelector('small');
    if (parent.classList !== 'form-control error') 
        parent.classList = 'form-control error';
    smallTag.innerText = message;
}

function showSuccess(input) {
    const parent = input.parentElement;
    const smallTag = parent.querySelector('small');
    if (parent.classList !== 'form-control success') 
        parent.classList = 'form-control success';

    }

function checkRequire(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === '') {
            const message = input
                .id
                .charAt(0)
                .toUpperCase() + input
                .id
                .slice(1) + ' est obligatoire';
            showError(input, message);
        } else {
            showSuccess(input);
        }
    });
}

function checkMatch(firstInput, secondInput) {
    if (firstInput !== secondInput) {
        const message = secondInput
            .id
            .charAt(0)
            .toUpperCase() + secondInput
            .id                                       
            .slice(1) + " Non valid" ;
        showError(secondInput, message);
    } else {
        showSuccess(secondInput);
    }
}

