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

        const convertedTemperature = performTemperatureConversion(inputTemperature, inputScale, outputScale);

        if (convertedTemperature === null) {
            showErrorMessage('Ошибка при конвертации');
            return;
        }

        document.querySelector('.output-field').value = convertedTemperature.toFixed(2);
    });

    const conversionRegistry = {
        celsius: {
            fahrenheit: convertCelsiusToFahrenheit,
            kelvin: convertCelsiusToKelvin,
            celsius: temperature => temperature
        },
        fahrenheit: {
            celsius: convertFahrenheitToCelsius,
            kelvin: convertFahrenheitToKelvin,
            fahrenheit: temperature => temperature
        },
        kelvin: {
            celsius: convertKelvinToCelsius,
            fahrenheit: convertKelvinToFahrenheit,
            kelvin: temperature => temperature
        }
    };

    function performTemperatureConversion(temperature, fromScale, toScale) {
        if (!conversionRegistry[fromScale] || !conversionRegistry[fromScale][toScale]) {
            return null;
        }
        return conversionRegistry[fromScale][toScale](temperature);
    }

    function convertCelsiusToFahrenheit(celsiusTemperature) {
        return (celsiusTemperature * 9 / 5) + 32;
    }

    function convertCelsiusToKelvin(celsiusTemperature) {
        return celsiusTemperature + 273.15;
    }

    function convertFahrenheitToCelsius(fahrenheitTemperature) {
        return (fahrenheitTemperature - 32) * 5 / 9;
    }

    function convertKelvinToCelsius(kelvinTemperature) {
        return kelvinTemperature - 273.15;
    }

    function convertFahrenheitToKelvin(fahrenheitTemperature) {
        return convertCelsiusToKelvin(convertFahrenheitToCelsius(fahrenheitTemperature));
    }

    function convertKelvinToFahrenheit(kelvinTemperature) {
        return convertCelsiusToFahrenheit(convertKelvinToCelsius(kelvinTemperature));
    }

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