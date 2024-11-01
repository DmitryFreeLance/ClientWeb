const people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 18},
    {name: "Charlie", age: 30},
    {name: "David", age: 22},
    {name: "Eve", age: 26},
    {name: "Frank", age: 40},
    {name: "Grace", age: 28},
    {name: "Heidi", age: 20},
    {name: "Ivan", age: 35},
    {name: "Judy", age: 24}
];

const averageAge = _.meanBy(people, person => person.age);
console.log("Средний возраст:", averageAge);

const peopleAged20to30 = _.chain(people)
    .filter(person => person.age >= 20 && person.age <= 30)
    .sortBy("age")
    .value();
console.log("Люди с возрастом от 20 до 30:", peopleAged20to30);

const uniqueNamesOfPeopleAged20to30 = _.chain(people)
    .filter(person => person.age >= 20 && person.age <= 30)
    .map("name")
    .uniq()
    .sortBy()
    .reverse()
    .value();
console.log("Уникальные имена людей с возрастом от 20 до 30:", uniqueNamesOfPeopleAged20to30);

const nameCountObject = _.countBy(people, "name");
console.log("Объект с именами и их количеством:", nameCountObject);