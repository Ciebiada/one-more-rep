import { func, object } from 'prop-types'
import React from 'react'
import Input from './Input'

const WorkSet = ({workSet, onUpdate}) => (
  <div className='row'>
    <div className='columns is-mobile'>
      <div className='column'>
        <Input
          type='number'
          className='clear-input'
          placeholder='Weight'
          value={workSet.weight}
          step='0.125'
          onChange={weight => onUpdate({weight})}
        />
      </div>
      <div className='column'>
        <Input
          type='number'
          className='clear-input'
          placeholder='Reps'
          value={workSet.reps}
          step='0.125'
          onChange={reps => onUpdate({reps})}
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
