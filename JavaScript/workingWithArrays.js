function firstFunction(){
    const array1 = [3, 5, 1, 4, 6, 8, 4, 2, 1, 7, 8, 9, 4, 6, 7, 8];
    const length = array1.length;

    array1.sort(function(e1,e2){
        return e1-e2
    });

    console.log(array1);

    const SplicedArray = array1.splice(0,5).concat(array1.splice(-5));
    console.log(SplicedArray);

    const array2 = [1, 2, 3, 4, 5, 6, 7, 8];
    const sumEvenNumbers = array2.reduce(function(currentSum, currentNumber){
        if(currentNumber % 2 === 0) {
            return currentSum + currentNumber;
        }
        else {
            return currentSum;
        }
    }, 0)

    console.log(sumEvenNumbers);
}

function secondFunction(){
    const array = [];

    for(let i = 1; i <= 100; i++){
        array.push(i);
    }

    const squaredEvenNumbers = array.filter(num => num % 2 === 0).map(num => num * num);

    console.log(squaredEvenNumbers);
};

firstFunction();
secondFunction();