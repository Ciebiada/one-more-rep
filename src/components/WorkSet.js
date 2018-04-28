import React from 'react'
import { object, func } from 'prop-types'

const controlledValue = value => value === null || value === undefined ? '' : value

const WorkSet = ({ workSet, onUpdate }) => (
  <div className='row'>
    <div className='columns is-mobile'>
      <div className='column'>
        <input
          type='number'
          className='clear-input'
          placeholder='Weight'
          value={controlledValue(workSet.weight)}
          step='0.125'
          onChange={(evt) => onUpdate({ weight: evt.target.value })}
        />
      </div>
      <div className='column'>
        <input
          type='number'
          className='clear-input'
          placeholder='Reps'
          value={controlledValue(workSet.reps)}
          step='0.125'
          onChange={(evt) => onUpdate({ reps: evt.target.value })}
        />
      </div>
    </div>
  </div>
)

WorkSet.propTypes = {
  workSet: object.isRequired,
  onUpdate: func.isRequired
}

export default WorkSet
