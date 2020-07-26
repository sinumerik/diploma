//links
const links = () => {
    const links = document.querySelectorAll('a');

    links.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
        });
    });
};

links();

// popup
const popup = () => {
    const popupCollection = document.querySelectorAll('.popup'),
        btnPopup = document.querySelectorAll('.btn-popup');

    const choosePopup = name => {
        // перебираем все поп-ап окна
        popupCollection.forEach(item => {
            // находим нужное по переданному окончанию классу
            if (item.classList.contains(`popup-${name}`)) {

                // fadeIn
                item.style.cssText = `display: block;
                                opacity: 0;
                                transition: .3s`;

                setTimeout(() => {
                    item.style.opacity = 1;
                });

                item.addEventListener('click', event => {

                    let target = event.target;
                    // кнопка закрытия активного поп-ап окна
                    const close = item.querySelector('.popup-close');

                    if (target === close) {
                        // fadeOut
                        item.style.cssText = `opacity: 0;
                                    display: block;
                                    transition: .3s`;

                        setTimeout(() => {
                            item.style.cssText = `display: none`;
                        }, 300);
                    } else {
                        target = target.closest('.capture-form');
                    }

                    if (!target) {
                        // fadeOut
                        item.style.cssText = `opacity: 0;
                                    display: block;
                                    transition: .3s`;

                        setTimeout(() => {
                            item.style.cssText = `display: none`;
                        }, 300);
                    }
                });
            }
        });
    };

    btnPopup.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            choosePopup(item.dataset.name);
        });
    });
};

popup();

//accordion
const accordion = () => {
    // получаем все аккордионы
    const panelGroup = document.querySelectorAll('.panel-group');

    panelGroup.forEach(item => {
        const panel = item.querySelectorAll('.panel'),
            panelButton = item.querySelectorAll('a.button');

        item.addEventListener('click', event => {
            // event.preventDefault();
            const target = event.target;

            // переключение между табами во всех аккордионах
            panel.forEach(item => {
                item.lastElementChild.style.maxHeight = item.lastElementChild.scrollHeight + "px";
                item.lastElementChild.classList.add('in');
                const height = item.lastElementChild.scrollHeight + "px";
                item.lastElementChild.style.maxHeight = 0;

                if (target.closest('.panel-heading') === item.firstElementChild) {
                    item.lastElementChild.style.maxHeight = height;
                }

                if (target.closest('.in') === item.lastElementChild) {
                    event.stopPropagation();
                    item.lastElementChild.style.maxHeight = height;
                }
            });

            // переключение табов по кнопкам
            panelButton.forEach(item => {
                if (item === target.closest('a.button')) {
                    const href = item.getAttribute('href').slice(1);
                    const head = document.getElementById(href);

                    head.style.maxHeight = head.scrollHeight + "px";
                    item.parentElement.parentElement.style.maxHeight = 0;
                }
            });
        });
    });
};

accordion();

//calculator
const calculator = () => {
    const typeSepticAvailable = document.getElementById('myonoffswitch'),
        bottomPresence = document.getElementById('myonoffswitch-two'),
        accordion = document.getElementById('accordion'),
        septicValue = document.querySelectorAll('.septic-value'),
        calcResult = document.getElementById('calc-result'),
        data = accordion.querySelectorAll('select'),
        inputLength = document.querySelector('.length');

    const oneSeptic = 10000,
        twoSeptic = 15000,
        regExp = /\D/g;

    let septicCount = undefined;

    const calcChanged = () => {
        inputLength.addEventListener('input', () => {
            inputLength.value = inputLength.value.replace(regExp, '');
        });


        let sum = 0;

        if (typeSepticAvailable.checked) {
            septicCount = 2;

            septicValue[1].style.display = 'none';

            sum  = oneSeptic;

            for (let i = 0; i < septicCount; i++) {
                sum += oneSeptic * +data[i].value / 100;
            }

            if (bottomPresence.checked) {
                sum += 1000;
            }

            calcResult.value = sum;
        } else {
            septicCount = 4;

            septicValue[1].style.display = 'block';

            sum = twoSeptic;

            for (let i = 0; i < septicCount; i++) {
                sum += twoSeptic * +data[i].value / 100;
            }
            if (bottomPresence.checked) {
                sum += 2000;
            }

            calcResult.value = sum;
        }
    };

    // проверяем количество камер септика
    calcChanged();

    // проверяем количество камер септика после изменения
    accordion.addEventListener('change', () => {
        calcChanged();
    });
};

calculator();

// add-sentence
const sentence = () => {
    const addSentence = document.querySelector('.add-sentence-btn'),
        row = addSentence.parentElement;

    addSentence.addEventListener('click', () => {
        const divs = row.querySelectorAll('div');

        divs.forEach(item => {
            item.classList.add('visible');
            item.classList.remove('hidden');
            item.classList.remove('visible-sm-block');
        });

        row.lastElementChild.classList.add('hidden');
    });
};

sentence();

// form-ajax-send
const sendFrom = () => {
    const successMessage = 'Спасибо, мы скоро с Вами свяжемся!',
        errorMessage = 'Что-то пошло не так...',
        pendingMessage = 'Загрузка...';

    const messageDiv = document.createElement('div');

    messageDiv.style.cssText = `padding: 10px;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        display: inline-block;
        margin-top: 15px;
        margin-bottom: 15px`;

    const heroForm = document.getElementById('form1'),
        modalForm = document.getElementById('form3'),
        footerForm = document.getElementById('form2');

    const formListener = form => {

        const regDigit = /^\+?\d+$/,
            regAlphabet = /[а-яА-ЯёЁ\s]+/g;

        for (const key of form.elements) {

            if (key.type === 'submit') {
                key.setAttribute('disabled', 'disabled');
            }

            if (key.type === 'tel') {
                key.addEventListener('input', event => {

                    if (regDigit.test(event.target.value)) {
                        event.target.style.border = '1px solid green';
                        for (const key of form.elements) {
                            if (key.type === 'submit') {
                                key.removeAttribute('disabled');
                            }
                        }
                    } else {
                        event.target.style.border = '1px solid red';
                        for (const key of form.elements) {
                            if (key.type === 'submit') {
                                key.setAttribute('disabled', 'disabled');
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

            form.appendChild(messageDiv);

            messageDiv.textContent = pendingMessage;

            const formData = new FormData(form);

            const body = {};

            formData.forEach((item, i) => {
                body[i] = item;
            });

            postData(body)
                .then(response => {

                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }

                    messageDiv.textContent = successMessage;
                    for (const key in body) {
                        form.elements[key].value = '';
                        form.elements[key].style.border = '1px solid transparent';
                    }
                    setTimeout(() => {
                        messageDiv.remove();
                    }, 5000);
                })
                .catch(() => {
                    messageDiv.textContent = errorMessage;
                });
        });
    };
};

sendFrom();
