import React from 'react'
import PageLayout from 'components/page-layout/PageLayout'
import LifeCalendar from 'containers/life-calendar/LifeCalendar'

export default class LifeCalendarView extends React.Component {
	render() {
		return (
			<PageLayout>
				<LifeCalendar />
			</PageLayout>
		)
	}
}
