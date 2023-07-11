

const url = 'http://localhost:8000/liveEvent'

const eventsFile = require('./events.json')

const events = eventsFile
const requestBody = Buffer.from(JSON.stringify(events), 'utf-8')

fetch(url, {
	method: 'POST',
	headers: {
		Authorization: 'secret',
		'Content-Type': 'application/json',
	},
	body: requestBody,
})
	.then((res) => {
		if (res.ok) {
			return res.text()
		} else {
			throw new Error(res.status)
		}
	})
	.then((res) => {
		console.log(res)
	})
	.catch((error) => {
		console.error('Error while posting events: ', error)
	})
