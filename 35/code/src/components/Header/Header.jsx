import React from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'

export default class Header extends React.PureComponent {
	render() {
		return (
			<nav className='header navbar navbar-toggleable-sm navbar-inverse'>

				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<a className="nav-link" href="#">35</a>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" activeClassName="active" to="timeline">Timeline</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" activeClassName="active" to="life-calendar">Life Calendar</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}
