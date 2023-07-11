

const processEvents = (events, client) => {
	
	client
		.connect()
		.then(() => {
			events.forEach((event) => {
				const { userId, name, value } = event
				const revenue = name === 'add_revenue' ? value : -value

				const query =
					'UPDATE users_revenue SET revenue = revenue + $1 WHERE user_id = $2'
				const values = [revenue, userId]

				client
					.query(query, values)
					.then(() => {
						console.log(`Updated user: ${userId}`)
					})
					.catch((err) => {
						console.error(`Error for user: ${userId}:`, err)
					})
			})
		})
		.catch((err) => {
			console.error('Error connecting to the database:', err)
		})
		
}

module.exports = processEvents
