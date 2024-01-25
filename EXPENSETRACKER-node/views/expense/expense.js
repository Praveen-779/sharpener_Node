async function addExpense(event) {
    const token = localStorage.getItem('token');
    event.preventDefault();
    const displayDiv = document.getElementById('display');

    const obj = {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    }

    try {
        const response = await axios.post('http://localhost:7000/expense/add-expense', obj,{headers : {'Authorization' : token}});
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
    const token = localStorage.getItem('token')
    console.log(id);
    try{
        await axios.delete(`http://localhost:7000/expense/delete/${id}`,{headers : {'Authorization' : token}});
        displayExpense();

    } catch(err) {
        console.log(err);
    }
}

document.getElementById('rzp-button1').onclick = async function(e) {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:7000/purchase/premiummembership',{headers : {'Authorization' : token}});

    console.log(response.data.key_id, response.data.order.id);

    const options = {
        "key" : response.data.key_id,
        "order_id" : response.data.order.id,
        "handler" : async function(response) {
            await axios.post('http://localhost:7000/purchase/updatetransactionstatus',{
                order_id : options.order_id,
                payment_id : response.razorpay_payment_id,
            }, {headers : {"Authorization" : token}})

            alert('TRANSACTION SUCCESSFULL');
            displayPremium();
        }
    }
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();

    rzp.on('payment.failed', async function(response) {
        await axios.post('http://localhost:7000/purchase/updatefailedstatus',{order_id : options.order_id},{headers : {"Authorization" : token}})
        alert('TRANSACTION FAILED');
    })

}

async function displayPremium() {
    const token = localStorage.getItem('token')
    const findPremium = await axios.get('http://localhost:7000/user/get-user',{headers : {"Authorization" : token}})
    const isPremium = findPremium.data.user.ispremiumuser;
    if(isPremium) {
        const buyPremiumButton = document.getElementById('rzp-button1');
        buyPremiumButton.style.display = 'none';

        const premiumMessage = document.createElement('p');
        premiumMessage.innerHTML = '<h3><strong>YOU ARE A PREMIUM USER!<strong><h3>';
        document.getElementById('premium').appendChild(premiumMessage);
        
        const showLeaderboardButton = document.createElement('button');
        showLeaderboardButton.textContent = 'Show Leaderboard';
        showLeaderboardButton.addEventListener('click',getLeaderboard);
        document.getElementById('premium').appendChild(showLeaderboardButton);
    }
        
        
    } 

    async function getLeaderboard() {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get('http://localhost:7000/premium/leaderboard',{headers : {'Authorization' : token}});
            const leaderBoardArray = response.data.leaderBoard;
            displayLeaderBoard(leaderBoardArray);

        } catch(err) {
            console.log(err);
        }
    }
    
    function displayLeaderBoard(leaderBoardArray) {
        const leaderboardDiv = document.getElementById('leaderboard');
        console.log(leaderBoardArray);
        leaderboardDiv.innerHTML = '';

        leaderboardDiv.innerHTML = '<h1>LEADERBOARD</h1>'

        leaderBoardArray.forEach(leaderBoard => {
            console.log(leaderBoard.name, leaderBoard.totalCost);
            
            const leaderboardEntry = document.createElement('li');
            leaderboardEntry.textContent = `name : ${leaderBoard.name}  - Amount : ${leaderBoard.totalCost ?? 0}  `
            leaderboardDiv.appendChild(leaderboardEntry);
        })
    }


document.addEventListener('DOMContentLoaded', async () => {
   await  displayExpense();
    await displayPremium();
});
