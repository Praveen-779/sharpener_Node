async function addData(event) {
    
    event.preventDefault() ;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value

    const obj = {
        name : name,
        email : email,
        password : password
    }

    try {
       const response =  await axios.post('http://localhost:7000/user/signup',obj)
       alert('user signup success, please login')
       document.getElementById('signupform').reset();
       
    }
   catch(error) {
    document.getElementById('displayError').innerHTML = `<div style= " color:red;">${error} ,  ${error.response.data.err}</div>`;
   }
}