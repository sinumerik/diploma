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

    const calcData = {};

    let septicCount = undefined;

    const calcChanged = () => {
        inputLength.addEventListener('input', () => {
            inputLength.value = inputLength.value.replace(regExp, '');
        });


        let sum = 0;

        if (typeSepticAvailable.checked) {
            septicCount = 2;

            calcData.cell = 1;

            septicValue[1].style.display = 'none';

            sum  = oneSeptic;

            for (let i = 0; i < septicCount; i++) {
                sum += oneSeptic * +data[i].value / 100;
            }

            if (bottomPresence.checked) {
                sum += 1000;
                calcData.presence = true;
            } else {
                calcData.presence = false;
            }

            calcResult.value = sum;
        } else {
            septicCount = 4;

            calcData.cell = 2;

            septicValue[1].style.display = 'block';

            sum = twoSeptic;

            for (let i = 0; i < septicCount; i++) {
                sum += twoSeptic * +data[i].value / 100;
            }
            if (bottomPresence.checked) {
                sum += 2000;
                calcData.presence = true;
            } else {
                calcData.presence = false;
            }

            calcResult.value = sum;
        }

        calcData.length = inputLength.value;
        calcData.result = calcResult.value;
        calcData.diametrOne = data[0].options[data[0].options.selectedIndex].text;
        calcData.valueOne = data[1].options[data[1].options.selectedIndex].text;
        calcData.diametrTwo = data[2].options[data[2].options.selectedIndex].text;
        calcData.valueTwo = data[3].options[data[3].options.selectedIndex].text;
    };

    calcChanged();

    accordion.addEventListener('change', () => {
        calcChanged();
    });

    return calcData;
};

export default calculator;
