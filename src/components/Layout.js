import { node } from 'prop-types'
import React from 'react'
import Hero from './Hero'

const Layout = ({title, subtitle, meta, children}) => (
  <div>
    <Hero
      title={title}
      subtitle={subtitle}
      meta={meta}
    />
    <section className='section'>
      <div className='container'>
        {children}
      </div>
    </section>
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Enjoy.</strong> Issues and ideas go <a
            href="https://github.com/ciebiada/one-more-rep/issues">here</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
)

Layout.propTypes = {
  title: node.isRequired,
  subtitle: node,
  meta: node,
  children: node.isRequired
}

export default Layout
