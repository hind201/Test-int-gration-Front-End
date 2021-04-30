// let passwordInput = document.getElementById('txtPassword'),
//     toggle = document.getElementById('btnToggle'),
//     pass = document.getElementById('pass'),
//     icon =  document.getElementById('eyeIcon');

// function togglePassword() {
//   if (passwordInput.type === 'password') {
//     passwordInput.type = 'text';
//     icon.classList.add("fa-eye-slash");
    
//   }
//   else if (passwordInput.type === 'pass') {
//     passwordInput.type = 'text';
//     icon.classList.add("fa-eye-slash");
    
//   } else {
//     passwordInput.type = 'password';
//     icon.classList.remove("fa-eye-slash");
  
//   }
// }



// toggle.addEventListener('click', togglePassword, false);
// passwordInput.addEventListener('keyup', checkInput, false);
// pass.addEventListener('keyup', checkInput, false);
$(document).ready(function () {
    $('.main-password').find('.input-password').each(function(index, input) {
        var $input = $(input);
        $input.parent().find('.icon-view').click(function() {
            var change = "";
            if ($(this).find('i').hasClass('fa-eye')) {
                $(this).find('i').removeClass('fa-eye')
                $(this).find('i').addClass('fa-eye-slash')
                change = "text";
            } else {
                $(this).find('i').removeClass('fa-eye-slash')
                $(this).find('i').addClass('fa-eye')
                change = "password";
            }
            var rep = $("<input type='" + change + "' />")
                .attr('id', $input.attr('id'))
                .attr('name', $input.attr('name'))
                .attr('class', $input.attr('class'))
                .val($input.val())
                .insertBefore($input);
            $input.remove();
            $input = rep;
        }).insertAfter($input);
    });
});

const formInputs = [...document.querySelectorAll('.form-control input')];
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confPassword = document.getElementById('conf-password');
const form = document.getElementById('form');
/*for label of inputs*/
formInputs.forEach((formInput) => {
  formInput.addEventListener('focusin', formInputFocusInHandler);
  formInput.addEventListener('focusout', formInputFocusOutHandler);
});

function formInputFocusInHandler() {
  const label = this.parentElement.querySelector('label');
  label.classList.add('active');
}

function formInputFocusOutHandler() {
  if (this.value === '') {
    const label = this.parentElement.querySelector('label');
    label.classList.remove('active');
  }
}

/*for form validation*/

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequire([username, email, password, confPassword]);
  checkEmail(email);
  checkLength(password, 8, 15);
  checkMatch(password, confPassword);
});

function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email not valid');
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
      const message =
        input.id.charAt(0).toUpperCase() + input.id.slice(1) + ' is require';
      showError(input, message);
    } else {
      showSuccess(input);
    }
  });
}

function checkMatch(firstInput, secondInput) {
  if (firstInput !== secondInput) {
    const message =
      secondInput.id.charAt(0).toUpperCase() +
      secondInput.id.slice(1) +
      ' not match';
    showError(secondInput, message);
  } else {
    showSuccess(secondInput);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    const message =
      input.id.charAt(0).toUpperCase() +
      input.id.slice(1) +
      ` length must be at least ${min} characters`;
    showError(input, message);
  } else if (input.value.length > max) {
    const message =
      input.id.charAt(0).toUpperCase() +
      input.id.slice(1) +
      ` length must be less than ${max} characters`;
    showError(input, message);
  } else {
    showSuccess(input);
  }
}

