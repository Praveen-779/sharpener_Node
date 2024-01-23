async function login(event) {
    event.preventDefault();
    const obj = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    }
    try {
       const response =  await axios.post('http://localhost:7000/user/login',obj);
       if(response.status === 200) {
        alert(response.data.message);
       }
       
    }
    catch(err) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = `<div style="color : red;">${err.response.data.message}</div>`
    }
}