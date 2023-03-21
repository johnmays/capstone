/* --------------------------------- */
/*       POSTGRES CLIENT SETUP       */
/* --------------------------------- */
const { Client } = require('pg');
const pg_config = require('./postgres_config.json')
const client = new Client(pg_config);

/* --------------------------------- */
/*        EXPRESS SERVER SETUP       */
/* --------------------------------- */
const express = require('express');
const app = express();
const port = 8050;

/* --------------------------------- */
/*       HTTP REQUEST METHODS        */
/* --------------------------------- */

/**
 * Retrieves the entries of a user given their ID.
 */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    const query = {
        name: 'get_user',
        text: 'SELECT * FROM "user" WHERE user_id = $1',
        values: [id]
    }

    client.query(query, (err, result) => {  
        if (err)
            res.status(500).send(err.message);

        // There should only be one row returned:
        console.log(`Fetching id: ${id}...`)
        res.send(result.rows[0])
    });
}

/**
 * Creates a user given a JSON-formatted sequence
 * associating columns/attributes with their values. Only
 * required columns (first_name, last_name, email, city, state, zip)
 * are required; unspecified columns are filled with NULL.
 * 
 * Returns the full user object, including the user's newly created ID.
 */
const createUser = (req, res) => {
    const column_names = [
        'first_name',
        'middle_initial',
        'last_name',
        'email',
        'profile_img',
        'bio',
        'city',
        'state',
        'zip',
        'skills'
    ];

    const required_cols = [
        'first_name',
        'last_name',
        'email',
        'city',
        'state',
        'zip'
    ];

    const params = req.body;
    verifyCols(params, required_cols, res);

    const query_values = column_names.map(col => params[col]);
    const query = {
        name: 'create_user',
        text: `INSERT INTO "user"(${column_names.join(',')})
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
               RETURNING *`,
        values: query_values
    }

    client.query(query, (err, result) => {
        if (err)
            res.status(500).send(err.message);

        // An object representing the entire user is returned!
        console.log(`Added user with ID ${result.rows[0].user_id}...`)
        res.send(result.rows[0]);
    });
}

/**
 * Creates a course given a JSON-formatted sequence
 * associating columns/attributes with their values. This requires
 * all columns (instructor_id, title, description, field, cost_per_session).
 * 
 * Returns the full course object, including the course's newly created ID.
 */
const createCourse = (req, res) => {
    const column_names = [
        'instructor_id',
        'title',
        'description',
        'field',
        'cost_per_session'
    ];

    const params = req.body;
    verifyCols(params, required_cols, res);

    const query_values = column_names.map(col => params[col]);
    const query = {
        name: 'create_course',
        text: `INSERT INTO course(${column_names.join(',')})
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`,
        values: query_values
    };

    client.query(query, (err, result) => {
        if (err)
            res.status(500).send(err.message);

        console.log(`Added course with ID ${result.rows[0].course_id}...`);
        res.send(result.rows[0]);
    });
}

/* --------------------------------- */
/*     MIDDLEWARE/INPUT HANDLING     */
/* --------------------------------- */
app.use(express.json());

/**
 * Ensures that the request body contains the proper
 * columns as required by the database.
 * 
 * Returns an HTTP 400 if the required columns aren't present.
 */
const verifyCols = (body, required_cols, res) => {
    let missing_cols = required_cols.filter(col => body[col] == null);
    if (missing_cols.length)
        res.status(400).send(`Missing columns: ${missing_cols.join(' ,')}`);
}

/* --------------------------------- */
/*           HTTP ENDPOINTS          */
/* --------------------------------- */
app.get('/getId/:id', (req, res) => {
    /* Endpoint to return user profile based on user id. */
    getUserById(req, res);
})

app.post('/createUser', (req, res) => {
    /* Endpoint to create a user record based on a json object. */
    createUser(req, res);
})

app.post('/createCourse', (req, res) => {
    /* Endpoint to create a course record based on a json object. */
    createCourse(req, res);
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

