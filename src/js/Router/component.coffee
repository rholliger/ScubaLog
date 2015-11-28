Logbook = require "../Logbook/component"
LogbookDetail = require "../LogbookDetail/component"

Router = React.createClass(
	getInitialState: ->
		{ component: <div /> }

	componentDidMount: ->
		page.base "/"

		page "/", =>
			@setState component: <Logbook />

		page "log", (ctx) =>
			@setState component: <LogbookDetail params=ctx.params />

		page "log/:id", (ctx) =>
			@setState component: <LogbookDetail params=ctx.params />

		page "*", =>
			console.log "page not found"

		page.start()

	render: ->
		@state.component
)

module.exports = Router