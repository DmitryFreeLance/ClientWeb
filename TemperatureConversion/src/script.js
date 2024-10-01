document.addEventListener("DOMContentLoaded", function(){
    const button = document.querySelector(".btn");
    button.onclick = function(e){
        const choosingScale = document.querySelector('#choosing_scale').value;
        const resultingScale = document.querySelector('#resulting_scale').value;

        const enteredValue = parseFloat(document.querySelector("#input").value);

        const result = convertTemperature(enteredValue, choosingScale, resultingScale);

        document.querySelector("#output").value = result;
    };

    function convertTemperature(value, fromScale, toScale) {
        let celsius;

        if (fromScale === 'celsius') {
            celsius = value;
        } else if (fromScale === 'fahrenheit') {
            celsius = fahrenheitToCelsius(value);
        } else if (fromScale === 'kelvin') {
            celsius = kelvinToCelsius(value);
        }

        if (toScale === 'celsius') {
            return celsius;
        } else if (toScale === 'fahrenheit') {
            return celsiusToFahrenheit(celsius);
        } else if (toScale === 'kelvin') {
            return celsiusToKelvin(celsius);
        }
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
});