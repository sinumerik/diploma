// popup

const popupCollection = document.querySelectorAll('.popup'),
    callBtns = document.querySelectorAll('.call-btn');

const chooseModal = name => {
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

callBtns.forEach(item => {
    item.setAttribute('data-name', 'call');

    item.addEventListener('click', event => {
        event.preventDefault();

        chooseModal(item.dataset.name);
    });
});



