async function forgetPassword(event) {
    try {
        event.preventDefault();
    const email = document.getElementById('email').value;
    const response = await axios.post('http://localhost:7000/password/forgetpassword', { email: email });
    console.log(response.data);
    document.getElementById('result').innerHTML = 'mail with link to reset password sent successfully';
    } catch(err) {
        console.log(err);
    }
}