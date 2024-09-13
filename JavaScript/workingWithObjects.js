function firstFunction(){
    const countries = [
        {name: 'Russia',
            cities: [
                {name : 'Moscow', population: 14365000},
                {name : 'Saint-Petesburg', population: 8639521 },
                {name : 'Novosibirsk', population: 2469123},
                {name : 'Krasnoyarsk', population: 1269123}]},
        {name: 'Belarus',
            cities: [
                {name : 'Minsk', population: 7365000},
                {name : 'Gomel', population: 639521 },
                {name : 'Mogilev', population: 469123}]},
        {name: 'Thailand',
            cities: [
                {name : 'Bangkok', population: 12365000},
                {name : 'Pattaya', population: 239521 }]},
    ];

    const countryWithMaxCities = countries.reduce((maxCountry, currentCountry) => {
        return currentCountry.cities.length > maxCountry.cities.length ? currentCountry : maxCountry;
    }, { cities: [] });

    console.log('Страна с максимальным количеством городов:', countryWithMaxCities.name);

    const totalPopulationByCountry = countries.reduce((total, country) => {
        total[country.name] = country.cities.reduce((sum, city) => sum + city.population, 0);
        return total;
    }, {});

    console.log('Общая численность населения по странам:', totalPopulationByCountry);
}

firstFunction();