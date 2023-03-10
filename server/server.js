/* POSTGRES CLIENT SETUP */
const { Client } = require('pg');
const client = new Client({
    host: 'ziggy.db.elephantsql.com',
    user: 'efmxpdls',
    password: 'o-PsenD3wAW8xT3v0sIsxFQiV491eVum',
    database: 'efmxpdls'
});

/* EXPRESS SERVER SETUP */
const express = require('express');
const app = express();
const port = 8050;
var conString = "" //Can be found in the Details page

/* HTTP REQUEST METHODS */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    const query = {
        text: 'SELECT * FROM "user" WHERE user_id = $1;',
        values: [id]
    }

    client.query(query, (err, result) => {  
        if (err) {
            return console.error('error running query', err);
        }
        console.log(`fetching id: ${id}`)
        res.send(result)
    });
}

const createUser = (req, res) => {
    const {id, first_name, middle_initial, last_name, email, profile_img, bio, city, state, zip, skills } = req.body
    // JOSH
    client.query(`INSERT INTO "user" values( ${id}, ${first_name}, ${middle_initial}, ${last_name}, ${email}, ${profile_img}, ${bio}, ${city}, ${state}, ${zip}, ${skills})`, (err, result) => {
        if(err) {
            return console.error('error running query', err);
        }
        // res.send(result.rows[0].theTime);
        console.log(`fetching id: ${id}`)
    });
}

/*ENDPOINTS */
app.get('/getId/:id', (req, res) => {
    /*Endpoint to return user profile based on user id.*/
    getUserById(req, res);
})

app.post('/createUser', (req, res) => {
    /*Endpoint to create a user record based on a json object. */
    createUser(req, res);
})

app.listen(port, () => {
    client.connect((err) => {
        if (err) {
            console.error('Database connection error', err.stack);
            return;
        }

        console.log(`Database connection successful, listening on port ${port}...`)
    });
})

