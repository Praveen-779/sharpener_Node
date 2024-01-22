async function addData(event) {
    
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const obj = {
        name : name,
        email : email,
        password : password
    }

    try {
       const response =  await axios.post('http://localhost:7000/user/signup',obj)
       
    }
   catch(error) {
    document.body.innerHTML.value='';
    document.body.innerHTML += `<div style= " color:red;">${error}</div>`;
   }

}