const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const PlayerRoutes = require('./routes/playerRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ extended: false }));

app.use('/players',PlayerRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err));




