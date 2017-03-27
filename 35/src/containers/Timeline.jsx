import React from 'react'
import './Timeline.scss'
import classnames from 'classnames'

const Year = ({ year, active }) =>
	<div className={classnames('Year', { 'active': active })}>{year}</div>

const HistoryItem = ({ item, order = 1, className }) => {
	const classNames = classnames('HistoryItem', `order-${order}`, className)

	return (
		<div className={classNames}>
				<h4 className="HistoryItem__header regular">{item.header}</h4>
				<p className="HistoryItem__description">весом в 3300 гр, в лисках с разрешения родителей, тут максимальный текст, который может влезть до нижнего предела...</p>
				{/* <p className="HistoryItem__description">и ничего</p> */}
		</div>
	)
}

const HelenHistoryItem = ({ item, order }) =>
	<div>
		<div className="HistoryItemHelen__age">3 года</div>
		<HistoryItem className="HistoryItemHelen" item={item} order={order} />
	</div>
const AntonHistoryItem = ({ item, order }) =>
	<HistoryItem className="HistoryItemAnton" item={item} order={order} />

const YearContainer = ({year, helenItems, antonItems}) => {
	const hasItems = (helenItems && helenItems.length > 0) && (antonItems && antonItems.length > 0)
	const gridHeigh = 4 // rem
	const distanceBetweenYears = 8 * gridHeigh
	const style = { minHeight: `${distanceBetweenYears}rem` }

	return (
		<div className="YearContainer" style={style}>
			<div className="YearContainer__item left">
				{ helenItems && helenItems.map((x, i) => <HelenHistoryItem item={x} key={i} order={i} />) }
			</div>
			<div className="YearContainer__item year"><Year year={year} active={hasItems} /></div>
			<div className="YearContainer__item right">
				{ antonItems && antonItems.map((x, i) => <AntonHistoryItem item={x} key={i} order={i} />) }
			</div>
		</div>
	)
}

const VerticalLine = () => <div className="VerticalLine" />

const MainLine = () => (
	<div className="MainLine">
		<VerticalLine />
		<YearContainer year={1982}
			helenItems={[{header: 'Родилась'}, {header: 'Уписялась'}, {header: 'Поломала Стул'}]}
			antonItems={[{header: 'Родился'}, {header: 'Родился'}, {header: 'Родился'}]} />
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
