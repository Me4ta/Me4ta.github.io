import React from 'react'
import './Workplace.scss'

const MainLine = () => {
	return (
		<div className="MainLine">&nbsp; s</div>
	)
}

class TimeLine extends React.Component {
	render() {
		return (
			<div className="TimeLine">
				<MainLine />
			</div>
		)
	}
}

export default () => (
	<div className="wh-100">
		{/* <h1>Рабочее место</h1>
		<h2>Рабочее место</h2>
		<h3>Рабочее место</h3>
		<h4>Рабочее место</h4> */}
		<TimeLine />
	</div>
)
