import 'bootstrap/scss/bootstrap.scss'
import 'style/main.scss'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from 'views/Index.view.jsx'

export default class RootContainer extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route component={Index} />
				</Switch>
			</BrowserRouter>
		)
	}
}
