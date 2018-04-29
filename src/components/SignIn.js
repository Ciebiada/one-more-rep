import React, { Component } from 'react'
import { recall, signIn, signUp, signOut } from '../db'

import Hero from './Hero'

class SignIn extends Component {
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

  changeLogin = (evt) => {
    this.setState({ login: evt.target.value })
  }

  changePassword = (evt) => {
    this.setState({ password: evt.target.value })
  }

  render() {
    return (
      <div>
        <Hero
          title='Sign in'
          subtitle='Sync your results with the cloud ☁️'
        />
        <section className='section'>
          <div className='container'>
            {this.state.signedUser
              ? <p>You are signed in as: <code>{this.state.signedUser}</code>. <a onClick={this.signOut}>Sign out</a></p>
              : (
                <div className='columns'>
                  <div className='column is-half is-offset-one-quarter'>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='text' placeholder='Username' value={this.state.login} onChange={this.changeLogin} />
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='password' placeholder='Password' value={this.state.password} onChange={this.changePassword} />
                      </div>
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <button className='button is-primary' onClick={this.signIn}>Sign in</button>
                      </div>
                      <div className='control'>
                        <button className='button is-text' onClick={this.signUp}>Sign up</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </section>
      </div>
    )
    // return this.state.signedUser
    //   ? <p>Signed in as: {this.state.signedUser}. <button onClick={this.signOut}>Sign out</button></p>
    //   : (
    //     <form>
    //       <input type='text' placeholder='Login' value={this.state.login} onChange={(evt) => this.setState({ login: evt.target.value })} />
    //       <input type='password' placeholder='Password' value={this.state.password} onChange={(evt) => this.setState({ password: evt.target.value })} />
    //       <input type='submit' value='Sign in' onClick={this.signIn} />
    //       <input type='button' value='Sign up' onClick={this.signUp} />
    //     </form>
    //   )
  }
}

export default SignIn
