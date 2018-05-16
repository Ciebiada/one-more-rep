import React from 'react'
import { func, string } from 'prop-types'

const controlledValue = value => value === null || value === undefined ? '' : value

class Input extends React.Component {
  state = {
    value: controlledValue(this.props.value)
  }

  updateValue = (evt) => {
    const value = evt.target.value
    this.props.onChange(value)
    this.setState({value})
  }

  render () {
    const props = this.props
    const { value } = this.state

    return (
      <input
        {...props}
        value={value}
        onChange={this.updateValue}
      />
    )
  }
}

Input.propTypes = {
  onChange: func.isRequired,
  value: string
}

export default Input
