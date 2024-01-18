const Player = require('../models/player');

exports.addData = (req, res, next) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const url = req.body.url;
    const birthplace = req.body.birthplace;
    const career = req.body.career;
    const matches = req.body.matches;
    const score = req.body.score;
    const fifties = req.body.fifties;
    const centuries = req.body.centuries;
    const wickets = req.body.wickets;
    const average = req.body.average;

    const newPlayer =  Player.create({
        name : name,
        dateofbirth: dob,
        photourl: url,
        birthplace: birthplace,
        career : career,
        numberofmatches: matches,
        score : score,
        fifties : fifties,
        centuries : centuries,
        wickets : wickets,
        average : average,
    }).then(response => {
        res.status(200).json({newPlayer : newPlayer})
    }).catch(err => console.log(err));

}

exports.getData = (req,res,next) => {
    const name = req.params.name;
    console.log(name)
    Player.findAll({where : {name : name}})
    .then(players => {
        console.log(players)
        res.status(200).json({players : players})
    }).catch(err => console.log(err));
}

exports.getPlayerById = (req,res,next) => {
    const id = req.params.id;
    Player.findByPk(id)
    .then(players => {
        res.status(200).json({player : players});
    })
}

exports.deletePlayer = (req,res,next) => {
    const id = req.params.id;
    Player.findByPk(id)
    .then(player => {
        player.destroy();
    }).catch(err => console.log(err));
}