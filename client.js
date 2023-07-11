

const url = 'http://localhost:8000/liveEvent'
const data = {
	name: 'John',
	age: 25,
}

fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'secret',
	},
	body: JSON.stringify(data),
})
	.then((response) => response.json())
	.then((result) => {
		// Handle the response from the server
		console.log(result)
	})
	.catch((error) => {
		// Handle any errors that occurred during the request
		console.error(error)
	})
