import React from 'react'
import classnames from 'classnames'
import './LifeCalendar.scss'
import ReactLifeCalendar from 'react-lifecalendar'

const data = {
  dob: '03/28/1982',
  lifeExpectancy: 100,
  ranges: [
    {start: '03/28/1982', end: '05/28/1999', title: 'Childhood', color: 'skyblue'},
    {start: '05/28/1999', end: '07/01/2004', title: 'University', color: 'lightgreen'},
		{start: '07/01/2004', end: '07/01/2012', title: 'Moskow', color: 'red'},
		{start: '07/01/2012', end: '07/01/2017', title: 'USA', color: 'blueviolet'},
    // {start: '09/01/1984', end: '09/01/1987', title: 'Junior School', color: 'aqua'},
    // {start: '09/01/1987', end: '09/01/1991', title: 'High School', color: 'brown'},
    // {start: '09/01/1991', end: '09/01/1995', title: 'College', color: 'lightgreen'},
    // {start: '09/01/1995', end: '05/14/2000', title: 'Internship', color: 'red'},
    // {start: '05/14/2000', end: '11/20/2010', title: 'My First Job', color: 'green'},
    // {start: '11/20/2010', end: '05/17/2014', title: 'My Second Job', color: 'lightblue'},
    // {start: '05/17/2014', title: 'My Current Job', color: 'orange'}
  ],
  milestones: [
    {date: '10/22/2003', title: 'Marries Denis'},
    {date: '04/28/2015', title: 'Marries Anton'},
    {date: '01/15/2017', title: 'Gives Birth to Mo'}
  ]
}

// receives props from clojure
export default class LifeCalendar extends React.Component {
	render() {
		return (
			<div className="LifeCalendar">
				<div className="LifeCalendar__container">
					<ReactLifeCalendar title="Helen's Life Calendar" data={data} />
				</div>
			</div>
		)
	}
}
