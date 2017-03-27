import React from 'react'
import './Timeline.scss'
import classnames from 'classnames'
import helenTimelineRaw from './helen-timeline'
import moment from 'moment'
import { groupBy } from 'lodash'


const Year = ({ year, active }) =>
	<div className={classnames('Year', { 'active': active })}>{year}</div>

const HistoryItem = ({ item, order = 0, totalItemsInSet = 0, upperInfo, className }) => {
	// total:order
	const itemPropsMap = {
		3: {
			0: {classNames: 'long', style: {top: '11px'}},
			1: {classNames: 'short condensed', style: {top: '5rem'}},
			2: {classNames: 'short wide', style: {top: '21rem'}}
		},
		2: {
			0: {classNames: 'long', style: {top: '11px'}},
			1: {classNames: 'short condensed', style: {top: '5rem'}}
		},
		1: {
			0: {classNames: 'short wide', style: {top: '11px'}}
		}
	}

	console.info(totalItemsInSet)
	console.info(order)
	const itemClass = itemPropsMap[totalItemsInSet][order].classNames
	const classNames = classnames('HistoryItem', className, itemClass)

	const itemStyle = itemPropsMap[totalItemsInSet][order].style

	/* 3 items
		- 0 is long (width 6)
		- 1 is short-codensed (width 6)
		- 2 is short-wide (8)
	*/

	/* 2 items
		- 0 is long (width 6)
		- 1 is short-wide (width 8)
	*/

	/* 1 item – 0 is short-wide (width  8) */

	return (
		<div className={classNames} style={itemStyle}>
				<div className="HistoryItem__uper-info">{upperInfo}</div>
				<h4 className="HistoryItem__title regular">{item.title}</h4>
				<p className="HistoryItem__description">весом в 3300 гр, в лисках с разрешения родителей, тут максимальный текст, который может влезть до нижнего предела...</p>
				{/* <p className="HistoryItem__description">и ничего</p> */}
		</div>
	)
}

const getHelensAge = date => {
	const birthday = moment({year: 1982, month: 2, day: 28})
	return date.diff(birthday, 'years')
}

const getAntonsAge = date => {
	const birthday = moment({year: 1986, month: 6, day: 9})
	return date.diff(birthday, 'years')
}

const HelenHistoryItem = ({ item, order, totalItemsInSet }) =>
	<HistoryItem className="HistoryItemHelen" item={item} order={order}
		totalItemsInSet={totalItemsInSet}
		upperInfo={`${getHelensAge(item.date)} лет`} />

const AntonHistoryItem = ({ item, order, totalItemsInSet }) =>
	<HistoryItem className="HistoryItemAnton" item={item} order={order}
		upperInfo={`${getAntonsAge(item.date)} лет`}
		totalItemsInSet={totalItemsInSet} />

const YearContainer = ({year, helenItems, antonItems}) => {
	const helenItemsCount = helenItems ? helenItems.length : 0
	const antonItemsCount = antonItems ? antonItems.length : 0
	const maxItemsCount = Math.max(helenItemsCount, antonItemsCount)

	const hasItems = (helenItemsCount > 0) || (antonItemsCount > 0)
	const gridHeigh = 4 // rem

	const itemCountToDistanceMap = {
		3: 8 * gridHeigh,
		2: 6 * gridHeigh,
		1: 4 * gridHeigh,
		0: 2 * gridHeigh
	}

	const distanceBetweenYears = itemCountToDistanceMap[maxItemsCount]
	const style = { minHeight: `${distanceBetweenYears}rem` }

	return (
		<div className="YearContainer" style={style}>
			<div className="YearContainer__item left">
				{ helenItems && helenItems.map((x, i) =>
					<HelenHistoryItem item={x} key={i} order={i} totalItemsInSet={helenItems.length} />) }
			</div>
			<div className="YearContainer__item year"><Year year={year} active={hasItems} /></div>
			<div className="YearContainer__item right">
				{ antonItems && antonItems.map((x, i) =>
					<AntonHistoryItem item={x} key={i} order={i} totalItemsInSet={antonItems.length} />) }
			</div>
		</div>
	)
}

const VerticalLine = () => <div className="VerticalLine" />

const MainLine = ({helenTimeline}) => {
	const yearContainerComps = Object.keys(helenTimeline).map(year => {
		return <YearContainer key={year} year={year} helenItems={helenTimeline[year]} />
	})

	return (
		<div className="MainLine">
			<VerticalLine />
			{/* <YearContainer year={1982}
				helenItems={[{title: 'Родилась'}, {title: 'Уписялась'}, {title: 'Поломала Стул'}]}
				antonItems={[{title: 'Родился'}, {title: 'Родился'}, {title: 'Родился'}]} />
			<YearContainer year={1986} helenItems={[{title: 'Пошла в садик'}]} />
			<YearContainer year={1987} antonItems={[{title: 'New Item'}]} />
			<YearContainer year={1988} />
			<YearContainer year={1989} />
			<YearContainer year={1990} /> */}
			{yearContainerComps}

			{/* {helenTimeline.map(x => <YearContainer year={moment(new Date(x.date))} helenItems=[x]/>)} */}
		</div>
	)
}


// ---- Timeline Cointainer Component

let toObjectsWithDates = timeline => timeline.map(x => ({
	...x,
	date: x.date.length === 4
		? moment(x.date, 'YYYY')
		: moment(x.date, 'DD MMMM YYYY')
}))

console.info(toObjectsWithDates(helenTimelineRaw).map(x => x.date.toString() + x.title))

const helenTimeline = groupBy(toObjectsWithDates(helenTimelineRaw), x => x.date.year())
console.info(helenTimeline)

// receives props from clojure
export default class TimeLine extends React.Component {
	render() {
		return (
			<div className="TimeLine">
				<MainLine helenTimeline={helenTimeline} />
			</div>
		)
	}
}
