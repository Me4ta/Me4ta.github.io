import React from 'react'
import PageLayout from 'components/page-layout/PageLayout'
import Workplace from 'containers/Workplace'

export default class IndexContainer extends React.Component {
	render() {
		return (
			<PageLayout>
				<Workplace />
			</PageLayout>
		)
	}
}
