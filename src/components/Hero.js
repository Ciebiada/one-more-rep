import classNames from 'classnames'
import { node } from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, login, logout } from '../auth'

class Hero extends Component {
  state = {
    menuOpened: false
  }

  toggleMenu = () => this.setState({ menuOpened: !this.state.menuOpened })

  render () {
    const { title, subtitle, meta } = this.props
    const { menuOpened } = this.state

    return (
      <section className='hero is-primary'>
        <div className='hero-head'>
          <nav className='navbar'>
            <div className='container'>
              <div className='navbar-brand'>
                <Link className='navbar-item' to='/'>One More Rep</Link>
                <span className='navbar-burger burger' onClick={this.toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div className={classNames('navbar-menu', { 'is-active': menuOpened })}>
                <div className='navbar-end'>
                  {isAuthenticated()
                    ? <Link to='/' className='navbar-item' onClick={logout}>Sign out</Link>
                    : <a className='navbar-item' onClick={login}>Sign in</a>}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>
              {title}
            </h1>
            <h2 className='subtitle'>
              {subtitle}
            </h2>
            {meta}
          </div>
        </div>
      </section>
    )
  }
}

Hero.propTypes = {
  title: node,
  subtitle: node,
  meta: node
}

export default Hero
