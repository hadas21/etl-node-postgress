const processEvents = (events) => {
	events.forEach((event) => {
		const { userId, name, value } = event
		const revenue = name === 'add_revenue' ? value : -value

		connection.query(
			'UPDATE users SET revenue = revenue + ? WHERE user_id = ?',
			[revenue, userId],
			(err, result) => {
				if (err) {
					console.error(`Error updating revenue for user ${userId}:`, err)
				} else {
					console.log(`Updated revenue for user ${userId}`)
				}
			}
		)
	})
}
