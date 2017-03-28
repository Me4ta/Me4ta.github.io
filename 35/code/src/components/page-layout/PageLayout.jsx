import React from 'react'
import Header from 'components/Header/Header'
// import Footer from 'components/Footer/Footer'

export class PageLayout extends React.PureComponent {
	render() {
		return (
			<div className='main'>
				<Header />
				<div className='content'>
					{this.props.children}
				</div>
				{/* <Footer /> */}
			</div>
		)
	}
}

export default PageLayout

PageLayout.propTypes = {
	children: React.PropTypes.oneOfType([
		React.PropTypes.array,
		React.PropTypes.object
	])
}
