/* POSTGRES CLIENT SETUP */
const { Client } = require('pg');
const pg_config = require('./postgres_config.json')
const client = new Client(pg_config);

/* EXPRESS SERVER SETUP */
const express = require('express');
const app = express();
const port = 8050;

/* HTTP REQUEST METHODS */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    const query = {
        name: 'get_user',
        text: 'SELECT * FROM "user" WHERE user_id = $1',
        values: [id]
    }

    client.query(query, (err, result) => {  
        if (err) {
            return console.error('error running query', err);
        }

        // There should only be one row returned:
        console.log(`Fetching id: ${id}...`)
        res.send(result.rows[0])
    });
}

const createUser = (req, res) => {
    const column_names = [
        'first_name', 'middle_initial', 'last_name', 'email', 'profile_img', 'bio', 'city', 'state', 'zip', 'skills'
    ];
    const params = req.body;
    const query_values = column_names.map(col => params[col]);

    const query = {
        name: 'create_user',
        text: `INSERT INTO "user"(${column_names.join(',')})
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
               RETURNING *`,
        values: query_values
    }

    client.query(query, (err, result) => {
        if(err) {
            return console.error('error running query', err);
        }

        // An object representing the entire user is returned!
        console.log(`Added user with ID ${result.rows[0].user_id}...`)
        res.send(result.rows[0]);
    });
}

/* MIDDLEWARE */
app.use(express.json());

/* ENDPOINTS */
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

