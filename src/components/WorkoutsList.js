import moment from 'moment'
import { arrayOf, object } from 'prop-types'
import React from 'react'
import List from './List'

const WorkoutsList = ({workouts}) => (
  <List
    elements={workouts}
    columns={[
      {name: 'Name', value: workout => workout.name || 'Unnamed'},
      {name: 'When', value: workout => moment(workout.date).fromNow()}
    ]}
    link={workout => `workouts/${workout._id}`}
    keyFunc={workout => workout._id}
    placeholder='You have no workouts. Create one!'
  />
)

WorkoutsList.propTypes = {
  workouts: arrayOf(object)
}

export default WorkoutsList
