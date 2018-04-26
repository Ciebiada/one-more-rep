import React, { Component } from 'react'
import { node } from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

class Hero extends Component {
  state = {
    menuOpened: false
  }

  toggleMenu = () => this.setState({ menuOpened: !this.state.menuOpened })

  render() {
    const { title, subtitle, menu } = this.props
    const { menuOpened } = this.state

    return (
      <section className='hero is-primary'>
        <div className='hero-head'>
          <nav className='navbar'>
            <div className='container'>
              <div className='navbar-brand'>
                <Link className='navbar-item' to='/'>One More Rep</Link>
                {menu
                  ? (
                    <span className='navbar-burger burger' onClick={this.toggleMenu}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  )
                  : null}
              </div>
              <div className={classNames('navbar-menu', { 'is-active': menuOpened })}>
                <div className='navbar-end'>
                  {menu}
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
          </div>
        </div>
      </section>
    )
  }
}

Hero.propTypes = {
  title: node,
  subtitle: node,
  menu: node
}

export default Hero
