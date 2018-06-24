import { func, object } from 'prop-types'
import React from 'react'
import Input from './Input'

const WorkSet = ({workSet, onUpdate, onBlur}) => (
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
          onBlur={() => onBlur(workSet)}
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
          onBlur={() => onBlur(workSet)}
        />
      </div>
    </div>
  </div>
)

WorkSet.propTypes = {
  workSet: object.isRequired,
  onBlur: func.isRequired,
  onUpdate: func.isRequired
}

export default WorkSet
