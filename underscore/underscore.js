document.addEventListener("DOMContentLoaded", function (){
    const people = [
        {name: 'Alice', age: 25},
        {name: 'Bob', age: 18},
        {name: 'Charlie', age: 30},
        {name: 'David', age: 22},
        {name: 'Eve', age: 26},
        {name: 'Frank', age: 40},
        {name: 'Grace', age: 28},
        {name: 'Heidi', age: 20},
        {name: 'Ivan', age: 35},
        {name: 'Judy', age: 24}
    ];

    const averageAge = _.reduce(people, function(memo, person) { return memo + person.age; }, 0) / people.length;
    console.log("Средний возраст:", averageAge);

    const peopleFrom20to30 = _.chain(people)
        .filter(function(person) { return person.age >= 20 && person.age <= 30; })
        .sortBy('age')
        .value();
    console.log("Люди с возрастом от 20 до 30:", peopleFrom20to30);

    const uniqueNames = _.chain(people)
        .filter(function(person) { return person.age >= 20 && person.age <= 30; })
        .pluck('name')
        .uniq()
        .sortBy()
        .reverse()
        .value();
    console.log("Уникальные имена людей с возрастом от 20 до 30:", uniqueNames);

    const peopleObject = _.groupBy(people, 'name');
    console.log("Объект с именами людей и их возрастами:", peopleObject);
})