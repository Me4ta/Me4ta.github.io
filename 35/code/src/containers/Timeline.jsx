import React from 'react'
import './Timeline.scss'
import classnames from 'classnames'
import helenTimelineRaw from './data/helen-timeline'
import antonTimelineRaw from './data/anton-timeline'
import moment from 'moment'
import { groupBy, range, last } from 'lodash'
import { humanizeYears } from './utils/humanize'

const today = moment()

const getItemHeigthOffset = itemHeight => {
	if (itemHeight <= 64) {
		return 0
	} else if (itemHeight > 64 && itemHeight <= 130) {
		return 1
	} else if (itemHeight >= 130) {
		return 2
	}
}

const gridHeigh = 4 // rem

const Year = ({ year, active }) =>
	<div className={classnames('Year', { 'active': active })}>{year}</div>

const HistoryItem = ({ item, order = 0, totalItemsInSet = 0, upperInfo, className, left = false, right = false }) => {
	// total:order
	const longItemStyle = {
		top: '11px',
		paddingRight: left ? '4rem' : 0,
	}

	const itemPropsMap = {
		7: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}},
			2: {classNames: 'long', style: {...longItemStyle, top: '24rem'}},
			3: {classNames: 'short condensed', style: {top: '30rem'}},
			4: {classNames: 'long', style: {...longItemStyle, top: '46rem'}},
			5: {classNames: 'short condensed', style: {top: '52rem'}},
			6: {classNames: 'short wide', style: {top: '66rem'}},
		},
		6: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}},
			2: {classNames: 'long', style: {...longItemStyle, top: '24rem'}},
			3: {classNames: 'short condensed', style: {top: '30rem'}},
			4: {classNames: 'long', style: {...longItemStyle, top: '46rem'}},
			5: {classNames: 'short condensed', style: {top: '52rem'}}
		},
		5: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}},
			2: {classNames: 'long', style: {...longItemStyle, top: '24rem'}},
			3: {classNames: 'short condensed', style: {top: '30rem'}},
			4: {classNames: 'short wide', style: {top: '46rem'}}
		},
		4: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}},
			2: {classNames: 'long', style: {...longItemStyle, top: '24rem'}},
			3: {classNames: 'short condensed', style: {top: '30rem'}}
		},
		3: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}},
			2: {classNames: 'short wide', style: {top: '24rem'}}
		},
		2: {
			0: {classNames: 'long', style: longItemStyle},
			1: {classNames: 'short condensed', style: {top: '7rem'}}
		},
		1: {
			0: {classNames: 'short wide', style: longItemStyle}
		}
	}

	const itemClass = itemPropsMap[totalItemsInSet][order].classNames
	const classNames = classnames('HistoryItem', className, itemClass, `order-${order}`)
	const itemStyle = itemPropsMap[totalItemsInSet][order].style

	return (
		<div className={classNames} style={itemStyle}>
				<div className="HistoryItem__uper-info">{upperInfo}</div>
				<h4 className="HistoryItem__title regular">{item.title}</h4>
				{/* <p className="HistoryItem__description">весом в 3300 гр, в лисках с разрешения родителей, тут максимальный текст, который может влезть до нижнего предела...</p> */}
				<p className="HistoryItem__description">{item.description}</p>
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
		left
		totalItemsInSet={totalItemsInSet}
		upperInfo={humanizeYears(getHelensAge(item.date))} />

const AntonHistoryItem = ({ item, order, totalItemsInSet }) =>
	<HistoryItem className="HistoryItemAnton" item={item} order={order}
		right
		totalItemsInSet={totalItemsInSet}
		upperInfo={humanizeYears(getAntonsAge(item.date))} />

const YearContainer = ({year, helenItems, antonItems}) => {
	const helenItemsCount = helenItems ? helenItems.length : 0
	const antonItemsCount = antonItems ? antonItems.length : 0
	const maxItemsCount = Math.max(helenItemsCount, antonItemsCount)

	const hasItems = (helenItemsCount > 0) || (antonItemsCount > 0)

	const itemCountToDistanceMap = {
		7: 21 * gridHeigh,
		6: 18 * gridHeigh,
		5: 15 * gridHeigh,
		4: 12 * gridHeigh,
		3: 9 * gridHeigh,
		2: 6 * gridHeigh,
		1: 4 * gridHeigh,
		0: 2 * gridHeigh
	}

	const getLongestItems = (helenItems, antonItems) => (helenItems ? helenItems.length : 0) > (antonItems ? antonItems.length : 0)
		? helenItems : antonItems

	const getLastItemsOffset = (helenItems, antonItems) => {
		const lastItem = last(getLongestItems(helenItems, antonItems))
		return getItemHeigthOffset(lastItem.description.length)
	}

	const additionalOffsetBasedOnContent = hasItems
		? getLastItemsOffset(helenItems, antonItems) * gridHeigh
		: 0

	const distanceBetweenYears = itemCountToDistanceMap[maxItemsCount] + additionalOffsetBasedOnContent

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

const MainLine = ({helenTimeline, antonTimeline}) => {
	// TODO bc: add another pass-through for anton timeline to grab years that are not in helens timeline
	const years = range(1981, today.year() + 2)
	console.info(years)

	const yearContainerComps = years.map(year => {
		return <YearContainer key={year} year={year}
			helenItems={helenTimeline[year]}
			antonItems={antonTimeline[year]}
			/>
	})

	return (
		<div className="MainLine">
			<VerticalLine />
			{yearContainerComps}
		</div>
	)
}

// ---- Timeline Cointainer Component

let toObjectsWithDates = timeline => timeline.map(x => ({
	...x,
	date: x.date.length === 4
		? moment(x.date, 'YYYY')
		: moment(x.date, 'YYYY, MMMM DD')
}))

const getGroupedTimeline = timeline => groupBy(toObjectsWithDates(timeline), x => x.date.year())

const helenTimeline = getGroupedTimeline(helenTimelineRaw)
const antonTimeline = getGroupedTimeline(antonTimelineRaw)


// receives props from clojure
export default class TimeLine extends React.Component {
	render() {
		return (
			<div className="TimeLine">
				<section className="headline-section">
					<h1><span className="helen-pink">Helen</span> & <span className="anton-blue">Anton</span></h1>
					<h1>Timeline</h1>
				</section>
				<MainLine helenTimeline={helenTimeline} antonTimeline={antonTimeline} />
			</div>
		)
	}
}
