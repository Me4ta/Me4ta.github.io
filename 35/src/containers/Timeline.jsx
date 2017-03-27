import React from 'react'
import './Timeline.scss'
import classnames from 'classnames'

const Year = ({ year, active }) =>
	<div className={classnames('Year', { 'active': active })}>{year}</div>

const HelenHistoryItem = () => <div>Пошла в садик</div>
const AntonHistoryItem = () => <div>Родился</div>

const YearContainer = ({year, helenItems, antonItems}) => {
	const hasItems = (helenItems && helenItems.length > 0) && (antonItems && antonItems.length > 0)

	return (
		<div className="YearContainer">
			<Year year={hasItems} active={hasItems} />
			helenItems.map(x => <HelenHistoryItem />)
			antonItems.map(x => <AntonHistoryItem />)
		</div>
	)
}

const VerticalLine = () => <div className="VerticalLine" />

const MainLine = () => (
	<div className="MainLine">
		<VerticalLine />
		<div className="MainLine__years">
			<Year year={1982} />
			<Year year={1983} active />
			<Year year={1984} active />
		</div>
	</div>
)

export default class TimeLine extends React.Component {
	render() {
		return (
			<div className="TimeLine">
				<MainLine />
			</div>
		)
	}
}
