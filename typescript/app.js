var number1 = document.getElementById('num1');
var number2 = document.getElementById('num2');
var buttonElement = document.querySelector('button');
function add(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    else if (typeof a === 'string' && typeof b === 'string') {
        return a + ' ' + b;
    }
    return +a + +b;
}
var numResults = [];
var textResults = [];
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener('click', function () {
    var num1 = number1.value;
    var num2 = number2.value;
    var result = add(+num1, +num2);
    var stringResult = add(num1, num2);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});
var myPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('it worked');
    }, 1000);
});
myPromise.then(function (result) {
    console.log(result);
});
