function userDetail(event) {
    event.preventDefault();

    // Access form fields through event.target.elements
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phoneNumber.value;

    document.getElementById('phoneNumber').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    // Create an object with the user details
    const obj = {
        username,
        email,
        phoneNumber
    };
    axios.post('http://localhost:8000/user/add-user',obj)
    .then(response => {
        display();
    })
    .catch(err => console.log(err));
}




window.addEventListener("DOMContentLoaded",() => {
    display();
})



function deleteUser(userId) {
    axios.delete(`http://localhost:8000/user/delete-user/${userId}`)
    .then(response => {
        console.log(response);
        display();
    } )
    .catch(err => console.log(err));
} 




function display() {
    axios.get("http://localhost:8000/user/get-users")
    .then(response => {
        console.log(response.data.userDetail);
        const userDetail = response.data.userDetail;
        const show = document.getElementById("show");
    show.innerHTML = "";
    for(let i = 0; i < userDetail.length; i++) {
        const name = userDetail[i].name;
        const email = userDetail[i].email;
        const number = userDetail[i].phonenumber;
        // console.log(userDetail[i].id);

        const listItem = document.createElement('li');
        listItem.textContent = `name: ${name} ,       email : ${email} ,      phone-number : ${number}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click",() => {
            event.preventDefault(); 
            deleteUser(userDetail[i].id);
        })
        listItem.appendChild(deleteButton);
        show.appendChild(listItem);
        }
    })
    .catch(err => console.log(err));
}