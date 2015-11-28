LogbookList = React.createClass(
	getInitialState: ->
		rows: [
			{
				index: 1
				value: "Erster Eintrag"
			}
			{
				index: 2
				value: "Erster Eintrag"
			}
			{
				index: 3
				value: "Erster Eintrag"
			}
		]

	test: ->
		console.log @state.rows
		newRow =
			index: new Date().getTime()
			value: "Ein neuer Eintrag"

		@state.rows.push(newRow)
		@setState @state.rows

	render: require "./template.rt"
)

module.exports = LogbookList