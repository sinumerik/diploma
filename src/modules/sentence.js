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

export default sentence;
