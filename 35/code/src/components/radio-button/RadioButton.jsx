import React from 'react'
import classNames from 'classnames'

import './RadioButton.scss'

export default class RadioButton extends React.Component {
	constructor(props) {
		super(props)

		this.state = { checked: this.props.checked }
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ checked: nextProps.checked })
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.checked !== nextState.checked || nextProps.checked !== this.state.checked
	}

	handleClick = e => {
		e && e.preventDefault()

		this.setState({ checked: !this.state.checked }, () => {
			this.state.checked ? this.props.on() : this.props.off()
		})
	}

	render() {
		const { checked } = this.state
		const className = classNames('radio-button', this.props.className, { '_active': checked })

		return (
			<label className={className} onClick={this.handleClick}>
				<input type='checkbox' name={this.props.name} checked={Boolean(checked)} />
			</label>
		)
	}
}

RadioButton.propTypes = {
	checked: React.PropTypes.bool,
	name: React.PropTypes.string,
	className: React.PropTypes.string,
	on: React.PropTypes.func,
	off: React.PropTypes.func
}

RadioButton.defaultProps = {
	checked: false,
	name: '',
	className: '',
	on: () => {},
	off: () => {}
}
