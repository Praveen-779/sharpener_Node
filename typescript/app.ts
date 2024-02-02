const number1 = document.getElementById('num1') as HTMLInputElement;
const number2 = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button')!;

function add(a: numOrString, b: numOrString): numOrString {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + ' ' + b;
    }
    return +a + +b;
}

const numResults: number[] = [];
const textResults: string[] = [];

type numOrString = number | string;
type Result = { val: numOrString; timestamp: Date };

function printResult(resultObj: Result) {
    console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
    const num1 = +number1.value;
    const num2 = +number2.value;
    const result = add(num1, num2);
    const stringResult = add(num1, num2);
    textResults.push(stringResult as string);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('it worked');
    }, 1000);
});

myPromise.then((result) => {
    console.log(result.split('w'));
});
