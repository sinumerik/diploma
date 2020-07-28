import calculator from './calculator';

const sendForm = () => {
    const successMessage = 'Спасибо, мы скоро с Вами свяжемся!',
        errorMessage = 'Что-то пошло не так...',
        pendingMessage = 'Загрузка...';

    const messageDiv = document.createElement('div');

    messageDiv.style.cssText = `padding: 10px;
        font-size: 18px;
        font-weight: 600;
        color: #4a4a4a;
        display: inline-block;
        margin-top: 15px;
        margin-bottom: 15px`;

    const mainForm = document.querySelector('.main-form'),
        captureForm = document.querySelectorAll('.capture-form');

    const formListener = (form, data) => {

        const regDigit = /^\+?\d+$/,
            regAlphabet = /[а-яА-ЯёЁ\s]+/g;

        for (const key of form.elements) {

            if (key.type === 'submit') {
                key.setAttribute('disabled', 'disabled');
            }

            if (key.className === 'popup-close') {
                key.removeAttribute('disabled');
            }

            if (key.type === 'tel') {
                key.addEventListener('input', event => {
                    if (regDigit.test(event.target.value)) {
                        event.target.style.border = '1px solid green';
                        for (const key of form.elements) {
                            if (key.type === 'submit' && key.className !== 'popup-close') {
                                key.removeAttribute('disabled');
                                key.style.border = '1px solid transparent';
                            }
                        }
                    } else {
                        event.target.style.border = '1px solid red';
                        for (const key of form.elements) {
                            if (key.type === 'submit' && key.className !== 'popup-close') {
                                key.setAttribute('disabled', 'disabled');
                                key.style.border = '1px solid red';
                            }
                        }
                    }
                });
            }

            if (key.type === 'text') {
                key.addEventListener('input', event => {

                    if (regAlphabet.test(event.target.value)) {
                        event.target.style.border = '1px solid green';
                    } else {
                        event.target.style.border = '1px solid red';
                        event.target.value = [...event.target.value.matchAll(regAlphabet)].join('');
                    }
                });
            }
        }

        const postData = body => fetch(('./server.php'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        form.addEventListener('submit', event => {
            event.preventDefault();

            // добавляем сообщение
            form.appendChild(messageDiv);

            messageDiv.textContent = pendingMessage;

            // создаем объект формы
            const formData = new FormData(form);

            // объект для отправки данных на сервер
            const body = {};

            // добавляем данные из калькулятора в отправляемый объект
            for (const key in data) {
                body[key] = data[key];
            }

            // данные из формы в отправляемый объект
            formData.forEach((item, i) => {
                body[i] = item;
            });

            postData(body)
                .then(response => {

                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }

                    messageDiv.textContent = successMessage;

                    const arr = [...form.elements];

                    arr.forEach(item => {
                        if (item.tagName === 'INPUT') {
                            item.value = '';
                        }
                    });

                    setTimeout(() => {
                        messageDiv.remove();
                    }, 5000);
                })
                .catch(() => {
                    messageDiv.textContent = errorMessage;
                });
        });
    };

    formListener(mainForm);
    captureForm.forEach(item => {
        const discountForm = document.querySelector('.popup-discount'),
            popupConsultation = document.querySelector('.popup-consultation');

        if (discountForm.contains(item)) {
            const calc = calculator();

            formListener(item, calc);
        } else if (popupConsultation.contains(item)) {

            const directorForm = document.querySelector('.director-form'),
                inputForm = directorForm.querySelector('input');

            const data = {};

            inputForm.addEventListener('input', () => {
                data.text = inputForm.value;
            });

            data.text = inputForm.value;

            formListener(item, data);
        } else {
            formListener(item);
        }

        // formListener(item);
    });
};

export default sendForm;
