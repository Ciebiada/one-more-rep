import React, { Component } from 'react'
import { recall, signIn, signUp, signOut } from '../db'

class Sign extends Component {
  state = {
    login: '',
    password: '',
    signedUser: null
  }

  componentDidMount() {
    recall().then(({ userCtx }) => {
      if (userCtx && userCtx.name)
        this.setState({ signedUser: userCtx.name })
    })
  }

  signIn = (event) => {
    event.preventDefault()

    signIn(this.state.login, this.state.password)
      .then(() => this.setState({ signedUser: this.state.login }))
  }

  signUp = () => {
    signUp(this.state.login, this.state.password)
  }

  signOut = () => {
    signOut().then(() => this.setState({ signedUser: null }))
  }

  render() {
    return this.state.signedUser
      ? <p>Signed in as: {this.state.signedUser}. <button onClick={this.signOut}>Sign out</button></p>
      : (
        <form>
          <input type='text' placeholder='Login' value={this.state.login} onChange={(evt) => this.setState({ login: evt.target.value })} />
          <input type='password' placeholder='Password' value={this.state.password} onChange={(evt) => this.setState({ password: evt.target.value })} />
          <input type='submit' value='Sign in' onClick={this.signIn} />
          <input type='button' value='Sign up' onClick={this.signUp} />
        </form>
      )
  }
}

export default Sign
