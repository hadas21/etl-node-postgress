

const url = 'http://localhost:8000/liveEvent'

const eventsFile = require('./events.json')

const events = eventsFile

// console.log(events)


fetch(url, {
	method: 'POST',
	headers: {
		Authorization: 'secret',
	},
	body: events,
})
	.then((response) => console.log(response.status))
	.catch((error) => {
	
		console.error(error)
	})
