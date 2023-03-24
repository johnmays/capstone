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
const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

/* --------------------------------- */
/*       HTTP REQUEST METHODS        */
/* --------------------------------- */

/**
 * Retrieves the entries of a user given their ID.
 */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    const query = {
        name: 'get_user_from_id',
        text: 'SELECT * FROM "user" WHERE user_id = $1',
        values: [id]
    };

    client.query(query, (err, result) => {  
        if (err)
            res.status(500).send(err.message);

        // There should only be one row returned:
        res.send(result.rows[0])
    });
}

/**
 * Creates a user given a JSON-formatted sequence
 * associating columns/attributes with their values. Only
 * required columns (first_name, last_name, email, city, state, zip)
 * are required; unspecified columns are filled with NULL.
 * 
 * An array of medical licenses (containing the ID and state) may also be specified;
 * those entries will be automatically added to the table with the correct user ID.
 * 
 * Returns the full user object, including the user's newly created ID.
 */
const createUser = (req, res) => {
    const columnNames = [
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

    const requiredCols = [
        'first_name',
        'last_name',
        'email',
        'city',
        'state',
        'zip'
    ];

    const params = req.body;
    verifyCols(params, requiredCols, res);

    const queryVals = columnNames.map(col => params[col]);
    const query = {
        name: 'create_user',
        text: `INSERT INTO "user"(${columnNames.join(',')})
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
               RETURNING *`,
        values: queryVals
    };

    client.query(query, (err, result) => {
        if (err)
            res.status(500).send(err.message);

        // An object representing the entire user is returned!
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
    const columnNames = [
        'instructor_id',
        'title',
        'description',
        'field',
        'cost_per_session'
    ];

    const params = req.body;
    verifyCols(params, required_cols, res);

    const queryVals = columnNames.map(col => params[col]);
    const query = {
        name: 'create_course',
        text: `INSERT INTO course(${columnNames.join(',')})
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`,
        values: queryVals
    };

    client.query(query, (err, result) => {
        if (err)
            res.status(500).send(err.message);
        res.send(result.rows[0]);
    });
}

/**
 * Retrieves a course by its ID.
 */
const getCourseById = (req, res) => {
    const id = parseInt(req.params.id)
    const query = {
        name: 'get_course_from_id',
        text: 'SELECT * FROM course WHERE course_id = $1',
        values: [id]
    };

    client.query(query, (err, result) => {  
        if (err)
            res.status(500).send(err.message);
        res.send(result.rows[0]);
    });
}

/**
 * Retrieves one or more course entries by field,
 * returning the result as an array of entries.
 * 
 * This performs a substring match, fetching all courses
 * that contain the queried field.
 */
const getCoursesByField = (req, res) => {
    const field = decodeURI(req.params.field);
    const query = {
        name: 'get_course_from_field',
        text: 'SELECT * FROM course WHERE POSITION($1 IN field) > 0',
        values: [field]
    };

    client.query(query, (err, result) => {
        if (err)
            res.status(500).send(err.message);
        res.send(result.rows);
    });
}

/**
 * Retrieves one or more courses by location,
 * returning the result as an array of entries.
 */

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

app.get('/', (req, res) => {
    /* Endpoint test without interacting with database. */
    res.send("This app is online!")
})

app.get('/getUser/id/:id', (req, res) => {
    /* Endpoint to return user profile based on user id. */
    getUserById(req, res);
})

app.post('/createUser', (req, res) => {
    /* Endpoint to create a user record based on a json object. */
    createUser(req, res);
})

app.get('/getCourse/id/:id', (req, res) => {
    /* Endpoint to return course information based on course id. */
    getCourseById(req, res);
})

app.get('/getCourse/field/:field', (req, res) => {
    /* Endpoint to return courses matching a particular field. */
    getCoursesByField(req, res);
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

