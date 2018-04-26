import React from 'react'
import { Link } from 'react-router-dom'
import { arrayOf, object } from 'prop-types'
import moment from 'moment'

import './WorkoutsList.css'

const WorkoutsList = ({ workouts }) => (
  workouts.length
    ? (
      <div className='WorkoutsList'>
        {workouts.map(workout => (
          <Link key={workout._id} to={`workout/${workout._id}`}>
            <div className='WorkoutsList-row'>
              <div className='columns has-text-centered'>
                <div className='column'>
                  {workout.name || 'Unnamed'}
                </div>
                <div className='column'>
                  {moment(workout.date).fromNow()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
    : <div className='notification'>You have no workouts. Create one!</div>
)

WorkoutsList.propTypes = {
  workouts: arrayOf(object)
}

export default WorkoutsList
