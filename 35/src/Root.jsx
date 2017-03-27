// overrides to not work for some reason
import 'style/bootstrap-overrides.scss'

import 'bootstrap/scss/bootstrap.scss'
import 'style/main.scss'

import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Index from 'views/Index.view.jsx'
import TimelineView from 'views/Timeline.view.jsx'

export default class RootContainer extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Index} />
					<Route exact path="/life-calendar" component={TimelineView} />
					<Route exact path="/timeline" component={TimelineView} />
				</Switch>
			</Router>
		)
	}
}
