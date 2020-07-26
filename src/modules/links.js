const links = () => {
    const links = document.querySelectorAll('a');

    links.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
        });
    });
};

export default links;
