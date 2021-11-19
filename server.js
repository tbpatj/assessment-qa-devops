const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

//Rollbar decaration
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: 'b6f026876b794e0d9820884816f97e32',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"));
    rollbar.info("Sent user html path files",{ip: `user ip: ${req.ip}`});
})
app.use('/js', express.static(path.join(__dirname, './public/index.js')));
app.use('/styles', express.static(path.join(__dirname, './public/index.css')));

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
        rollbar.info("Sent user robots path files",{ip: `${req.ip}`});
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
        rollbar.error("Was unable to send the user the robots to display")
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.info("shuffled and sent user bots")
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.error('unable to shuffle the bots and send to user');
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
            rollbar.info("player lost the fight, and sent them status successfully");
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
            rollbar.info("player won the fight, and sent them status successfully")
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400);
        rollbar.error("There was an error in the dueling code");
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})