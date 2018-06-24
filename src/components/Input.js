import { bool, func, string } from 'prop-types'
import React from 'react'

const controlledValue = value => value === null || value === undefined ? '' : value

class Input extends React.Component {
  state = {
    value: controlledValue(this.props.value),
    focused: this.props.autoFocus
  }

  updateValue = evt => {
    const value = evt.target.value
    this.props.onChange(value)
    this.setState({value})
  }

  componentWillReceiveProps (props) {
    if (props.value && !this.state.focused) {
      this.setState({value: props.value})
    }
  }

  onFocus = () => {
    this.setState({focused: true})
  }

  onBlur = evt => {
    const value = evt.target.value

    if (this.props.onBlur) this.props.onBlur(value)

    this.setState({focused: false})
  }

  render () {
    const props = this.props
    const {value} = this.state

    return (
      <input
        {...props}
        value={value}
        onChange={this.updateValue}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }
}

Input.propTypes = {
  onChange: func.isRequired,
  onBlur: func,
  value: string,
  autoFocus: bool
}

export default Input
