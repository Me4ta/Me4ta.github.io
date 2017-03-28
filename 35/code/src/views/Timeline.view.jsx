import React from 'react'
import PageLayout from 'components/page-layout/PageLayout'
import Timeline from 'containers/Timeline'

export default class TimelineView extends React.Component {
	render() {
		return (
			<PageLayout>
				<Timeline />
			</PageLayout>
		)
	}
}
