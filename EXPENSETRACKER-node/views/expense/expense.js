async function addExpense(event) {
    event.preventDefault();
    const displayDiv = document.getElementById('display');

    const obj = {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    }

    try {
        const response = await axios.post('http://localhost:7000/expense/add-expense', obj);
    }
    catch (err) {
        console.log(err);
    }

    displayExpense();
}


async function displayExpense() {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const result = await axios.get('http://localhost:7000/expense/get-expense',{headers : {'Authorization' : token}});
        const displayDiv = document.getElementById('display');
        displayDiv.innerHTML = '';

        const expenses = result.data.expenses;

        for (let i = 0; i < expenses.length; i++) {

            const amount = expenses[i].amount;
            const category = expenses[i].category;
            const description = expenses[i].description;
            const id = expenses[i].id;

            const expenseDetail = document.createElement('p');
            expenseDetail.innerHTML =
                `Amount : ${amount} - Category : ${category} - Description : ${description}
                 <button onclick="deleteExpense(${id})">Delete</button>`

            displayDiv.appendChild(expenseDetail);
        }

    } catch (err) {
        console.log(err);
    }
}

async function deleteExpense(id) {
    console.log(id);
    try{
        await axios.delete(`http://localhost:7000/expense/delete/${id}`);
        displayExpense();

    } catch(err) {
        console.log(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayExpense();
});
