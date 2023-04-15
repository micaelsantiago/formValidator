const validator = {
  handleSubmit: (event) => {
    event.preventDefault();

    let send = true;
    const inputs = form.querySelectorAll('input');

    validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validator.checkInput(input);

      if (check !== true) {
        send = false;

        validator.showError(input, check);
      }
    }

    if (send) {
      form.submit();
    }
  },

  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');

      for (let rule in rules) {
        let ruleDetails = rules[rule].split('=');

        switch (ruleDetails[0]) {
          case 'required':
            if (input.value === '') {
              return 'Field(s) cannot be empty!';
            }

            break;
          
          case 'min':
            if (input.value.length < ruleDetails[1]) {
              return `Your password must be at least ${ruleDetails[1]} characters long!`;
            }

            break;
          
          case 'email': 
            if (input.value != '') {
              let regex = /\S+@\S+\.\S+/

              if (!regex.test(input.value.toLowerCase())) {
                return 'Email entered is not valid!'
              }
            }

            break;
        }
      }
    }

    return true;
  },

  showError: (input, error) => {
    input.style.borderColor = '#FF0000';

    const errorElement = document.querySelector('.msgError');

    errorElement.style.display = 'block';
    errorElement.innerHTML = error;
  },

  clearErrors: () => {
    const errorElements = document.querySelectorAll('.error');
    const inputs = form.querySelectorAll('input');

    for (let e = 0; e < inputs.length; e++) {
      inputs[e].style = '';
    }

    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  }
}

const form = document.querySelector('.validator');

form.addEventListener('submit', validator.handleSubmit);