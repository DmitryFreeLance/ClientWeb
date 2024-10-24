document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.querySelector('.btn');

    convertButton.addEventListener('click', function () {
        const inputScale = document.querySelector('.input_scale').value;
        const outputScale = document.querySelector('.result_scale').value;
        const inputTemperature = parseFloat(document.querySelector('.input-field').value);

        if (isNaN(inputTemperature)) {
            displayError('Необходимо ввести число.');
            return;
        }

        const convertedTemperature = convertTemperature(inputTemperature, inputScale, outputScale);
        if (convertedTemperature === null) {
            displayError('Ошибка при конвертации');
        } else {
            document.querySelector('.output-field').value = convertedTemperature.toFixed(2);
        }
    });

    function convertTemperature(temperature, fromScale, toScale) {
        const converters = {
            'celsius': {
                'fahrenheit': celsiusToFahrenheit,
                'kelvin': celsiusToKelvin,
                'celsius': (temp) => temp
            },
            'fahrenheit': {
                'celsius': fahrenheitToCelsius,
                'kelvin': fahrenheitToKelvin,
                'fahrenheit': (temp) => temp
            },
            'kelvin': {
                'celsius': kelvinToCelsius,
                'fahrenheit': kelvinToFahrenheit,
                'kelvin': (temp) => temp
            }
        };

        if (!converters[fromScale] || !converters[fromScale][toScale]) {
            return null;
        }

        return converters[fromScale][toScale](temperature);
    }

    function celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    function celsiusToKelvin(celsius) {
        return celsius + 273.15;
    }

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    function kelvinToCelsius(kelvin) {
        return kelvin - 273.15;
    }

    function fahrenheitToKelvin(fahrenheit) {
        return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
    }

    function kelvinToFahrenheit(kelvin) {
        return celsiusToFahrenheit(kelvinToCelsius(kelvin));
    }

    function displayError(message) {
        alert(message);
    }
});