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

export default accordion;
