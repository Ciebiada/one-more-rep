import React from 'react'
import { func, string, bool } from 'prop-types'

const controlledValue = value => value === null || value === undefined ? '' : value

class Input extends React.Component {
  state = {
    value: controlledValue(this.props.value),
    focused: this.props.autoFocus
  }

  updateValue = evt => {
    const value = evt.target.value
    this.props.onChange(value)
    this.setState({ value })
  }

  componentWillReceiveProps (props) {
    if (props.value && !this.state.focused) {
      this.setState({value: props.value})
    }
  }

  onFocus = () => {
    this.setState({focused: true})
  }

  onBlur = () => {
    this.setState({focused: false})
  }

  render () {
    const props = this.props
    const { value } = this.state

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
  value: string,
  autoFocus: bool
}

export default Input
