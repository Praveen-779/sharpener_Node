const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile('username.txt', (err, data) => {
    if (err) {
      data = 'chat is empty';
    }
    res.send(`${data}
    <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
      <input id="message" name="message" type="text" placeholder="enter message">
      <input type="hidden" name="username" id="username">
      <button type="submit">send message</button>
    </form>
  `);
  });

});

app.post("/", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.message);
  fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, { flag: 'a' }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing to username.txt");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/login", (req, res) => {
  res.send(
    `<label for="username">Enter Username :</label>
    <form action="/login" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
      <input type="text" name="username" id="username" placeholder="username">
      <input type="submit">
    </form>`
    
  )
});
app.post("/login",(req,res)=> {
  res.redirect("/");
})

app.listen(3000);
