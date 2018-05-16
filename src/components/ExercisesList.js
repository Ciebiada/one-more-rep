import { arrayOf, func, object } from 'prop-types'
import React from 'react'
import './ExercisesList.css'
import WorkSet from './WorkSet'
import Input from './Input'

const ExercisesList = ({ exercises, onExerciseDelete, onExerciseUpdate, updateWorkSet }) => (
  exercises && exercises.length
    ? (
      <div className='ExercisesList'>
        {exercises.map(exercise => (
          <div key={exercise._id} className='notification is-light'>
            <h4 className='title is-4'>
              <Input
                autoFocus={!exercise.name}
                className='clear-input'
                type='text'
                placeholder='Exercise name'
                value={exercise.name}
                onChange={name => onExerciseUpdate(exercise._id)({ name })}
              />
            </h4>
            <button className='delete' onClick={onExerciseDelete(exercise._id)} />
            {exercise.workSets && exercise.workSets.map(workSet => (
              <WorkSet
                key={workSet._id}
                workSet={workSet}
                onUpdate={updateWorkSet(exercise._id)(workSet._id)}
              />
            ))}
          </div>
        ))}
      </div>
    )
    : <div className='notification'>You have no exercises. Create one!</div>
)

ExercisesList.propTypes = {
  exercises: arrayOf(object),
  onExerciseDelete: func.isRequired,
  onExerciseUpdate: func.isRequired,
  updateWorkSet: func.isRequired
}

export default ExercisesList
