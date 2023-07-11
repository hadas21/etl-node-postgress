const express = require('express')
const fs = require('fs')
const processEvents = require('./data_processor')
const { Client } = require('pg')

const app = express()
const port = 8000

app.use(express.json())

 const connectionString = 'postgresql://me:password@localhost:5432/api'

 //create table in db
const createTable = () => {
 
  const sqlScript = fs.readFileSync('db.sql', 'utf8');

 const client = new Client({ connectionString })
  client.connect()
    .then(() => client.query(sqlScript))
    .then(() => {
      console.log('Database table created successfully');
      client.end();
    })
    .catch((error) => {
      console.error('Error creating database table:', error);
      client.end();
    });
};




// Middleware 
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader === 'secret') {
    next(); 
  } else {
    res.status(401).send('Unauthorized'); 
  }
};

// POST 
app.post('/liveEvent', authenticate, (req, res) => {
const client = new Client({ connectionString })
  const events = req.body; 
  
  fs.writeFile('eventData.txt', JSON.stringify(events), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error'); 
    } else {
      processEvents(events, client)
      res.status(200).send('Event saved successfully'); 
    }
  });
});

// GET 
app.get('/userEvents/:userId', (req, res) => {
    const client = new Client({ connectionString })
     client.connect().then(()=> {
const query = 'SELECT * FROM user_events WHERE user_id = $1';
      return client.query(query, [userId]);
    })
    .then((result) => {
      const userEvents = result.rows;
      res.json(userEvents);
    })
    .catch((error) => {
      console.error(`Error fetching user events for user ${userId}:`, error);
      res.status(500).send('Internal Server Error');
    })
    .finally(() => {

      client.end();
    });
})


app.listen(port, () => {
	console.log('listening on port ' + port)
    createTable()
})
