document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.querySelector('.btn');

    convertButton.addEventListener('click', function () {
        const inputScale = document.querySelector('.input-scale').value;
        const outputScale = document.querySelector('.result-scale').value;
        const inputTemperature = parseFloat(document.querySelector('.input-field').value);

        if (isNaN(inputTemperature)) {
            showErrorMessage('Необходимо ввести число.');
            return;
        }

        clearErrorMessage();

        const convertedTemperature = convertTemperature(inputTemperature, inputScale, outputScale);

        if (convertedTemperature === null) {
            showErrorMessage('Ошибка при конвертации');
            return;
        }

        document.querySelector('.output-field').value = convertedTemperature.toFixed(2);
    });

    const scaleRegistry = {};

    function registerScale(scaleName, toCelsius, fromCelsius) {
        scaleRegistry[scaleName] = {
            toCelsius,
            fromCelsius
        };
    }

    function convertTemperature(temperature, fromScale, toScale) {
        const from = scaleRegistry[fromScale];
        const to = scaleRegistry[toScale];

        if (!from || !to) {
            return null;
        }

        const celsiusTemp = from.toCelsius(temperature);
        return to.fromCelsius(celsiusTemp);
    }

    registerScale('celsius', temp => temp, temp => temp);
    registerScale('fahrenheit',
        fahrenheit => (fahrenheit - 32) * 5 / 9,
        celsius => (celsius * 9 / 5) + 32);
    registerScale('kelvin',
        kelvin => kelvin - 273.15,
        celsius => celsius + 273.15);

    function showErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function clearErrorMessage() {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';
    }
});