const express = require('express')
const fs = require('fs')
const connection = require('./db.sql')

const app = express()
const port = 8000

app.use(express.json())


// Middleware to authenticate the client's calls
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'secret') {
    next(); 
  } else {
    res.status(401).send('Unauthorized'); 
  }
};

// POST endpoint for /liveEvent
app.post('/liveEvent', authenticate, (req, res) => {
  const event = req.body; 

  fs.writeFile('eventData.txt', JSON.stringify(event), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error'); 
    } else {
      res.status(200).send('Event saved successfully'); 
    }
  });
});

// GET endpoint for /userEvents
app.get('/userEvents/:userId', (req, res) => {
	connection.query(
		'SELECT * FROM users ORDER BY id desc',
		function (err, rows) {
			if (err) {
				req.flash('error', err)
				res.render('profile', { data: '' })
			} else {
				res.render('profile', { data: rows })
			}
		}
	)
})


app.listen(port, () => {
	console.log('listening on port ' + port)
})
