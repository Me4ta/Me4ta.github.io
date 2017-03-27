import React from 'react'
import './Timeline.scss'
import classnames from 'classnames'

const Year = ({ year, active }) =>
	<div className={classnames('Year', { 'active': active })}>{year}</div>

const HistoryItem = ({ item, order = 1, className }) => {
	const classNames = classnames('HistoryItem', `order-${order}`, className)
	return (
		<div className={classNames}>
			<h4>{item.header}</h4>
			<p>весом в 3300 гр, в лисках с разрешения родителей, тут максимальный текст, который может влезть до нижнего предела...</p>
		</div>
	)
}

const HelenHistoryItem = ({ item }) =>
	<HistoryItem className="HistoryItemHelen" item={item} />
const AntonHistoryItem = ({ item }) =>
	<HistoryItem className="HistoryItemAnton" item={item} />

const YearContainer = ({year, helenItems, antonItems}) => {
	const hasItems = (helenItems && helenItems.length > 0) && (antonItems && antonItems.length > 0)
	const gridHeigh = 4 // rem
	const style = { minHeight: `${5 * gridHeigh}rem` }

	return (
		<div className="YearContainer" style={style}>
			<div className="YearContainer__item">
				{ helenItems && helenItems.map((x, i) => <HelenHistoryItem item={x} key={i} />) }
			</div>
			<div className="YearContainer__item year"><Year year={year} active={hasItems} /></div>
			<div className="YearContainer__item">
				{ antonItems && antonItems.map((x, i) => <AntonHistoryItem item={x} key={i} />) }
			</div>
		</div>
	)
}

const VerticalLine = () => <div className="VerticalLine" />

const MainLine = () => (
	<div className="MainLine">
		<VerticalLine />
		<YearContainer year={1982} helenItems={[{header: 'Родилась'}]} antonItems={[{header: 'Родился'}]} />
		<YearContainer year={1986} helenItems={[{header: 'Пошла в садик'}]} />

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
