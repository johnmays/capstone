var pg = require('pg');
const express = require('express');
const app = express();
const port = 8050;
var conString = "postgres://efmxpdls:o-PsenD3wAW8xT3v0sIsxFQiV491eVum@ziggy.db.elephantsql.com/efmxpdls" //Can be found in the Details page


const clientConnect = () => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
    });

    return client
}

const getUserById = (req, res) => {
    
    const id = parseInt(req.params.id)
    client.query(`SELECT * from user where user_id = ${id}`, (err, result) => {
        if(err) {
            return console.error('error runn{ing query', err);
        }
        // res.send(result.rows[0].theTime);
        console.log(`fetching id: ${id}`)
        res.send(id)
    });
}

const createUser = (req, res) => {
    const {id, first_name, middle_initial, last_name, email, profile_img, bio, city, state, zip, skills } = req.body
    client.query(`INSERT INTO user values( ${id}, ${first_name}, ${middle_initial}, ${last_name}, ${email}, ${profile_img}, ${bio}, ${city}, ${state}, ${zip}, ${skills})`, (err, result) => {
        if(err) {
            return console.error('error running query', err);
        }
        // res.send(result.rows[0].theTime);
        console.log(`fetching id: ${id}`)
    });
}

app.get('/getId/:id', (req, res) => {
    /*Endpoint to return user profile based on user id.*/
    client = clientConnect();
    getUserById(req, res);
    client.end();
})

app.post('/createUser', (req, res) => {
    client = clientConnect();
    createUser(req, res);
    client.end();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
