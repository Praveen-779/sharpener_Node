function addExpense() {
    event.preventDefault();
    var date = document.getElementById("date").value;
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var tableBody = document.getElementById("expenseTableBody");

    if (date && description && amount) {
        const obj = {
            date: date,
            description: description,
            amount: amount
        }

        axios.post('http://localhost:7000/expense/add-expense', obj)
            .then(response => {
                display();
            }).catch(err => console.log('error adding expense :  ',err));

            //reset form fields
        document.getElementById("date").value = "";
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    display()
})

function display() {
    event.preventDefault()
    axios.get('http://localhost:7000/expense/get-expenses')
        .then(response => {
            const expense = response.data.expense;
            var tableBody = document.getElementById("expenseTableBody");
            tableBody.innerHTML = '';
            let totalexpense = 0;
            for (let i = 0; i < expense.length; i++) {
                const date = expense[i].date;
                const amount = expense[i].amount;
                const description = expense[i].description;
                const id = expense[i].id;

                //it will create new table row
                var newRow = document.createElement("tr");
                newRow.innerHTML = `<td>${date}</td><td>${description}</td><td>${amount}</td><td><button onclick="editRow(${id})">Edit</button><button onclick="deleteRow(${id})">Delete</button></td>`;

                //append the row which created up 
                tableBody.appendChild(newRow);

                totalexpense += +amount; 
            }
            //display totalexpense function
            totalExpense(totalexpense);

        }).catch(err => console.log('error display expense : ' , err));


}

function editRow(id) {
    axios.get(`http://localhost:7000/expense/get-expense/${id}`)
        .then(response => {
            const expense = response.data.expense;
            console.log(expense.date);
            document.getElementById("date").value = expense.date;
            document.getElementById("description").value = expense.description;
            document.getElementById("amount").value = expense.amount;
            deleteRow(id);

        })
        .catch(err => console.log(err));
}

function deleteRow(id) {
    console.log(id);
    axios.delete(`http://localhost:7000/expense/delete-expense/${id}`)
        .then(response => {
            display()
        }).catch(err => console.log('error deleting expense', err));
}

function totalExpense(totalExpense) {
    document.getElementById("totalExpense").innerHTML = `<b>Total Expense:</b>  ${totalExpense}`;
}

