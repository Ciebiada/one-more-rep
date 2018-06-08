import { arrayOf, func, object, string } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import './List.css'

const List = ({elements, link, columns, placeholder, keyFunc}) => {
  const row = element => (
    <div key={keyFunc(element)} className='List-row'>
      <div className='columns has-text-centered'>
        {columns.map(column => (
          <div key={column.name} className='column'>
            {column.value(element)}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    elements.length
      ? (
        <div className='List'>
          {elements.map(element => link
            ? <Link key={keyFunc(element)} to={link(element)}>{row(element)}</Link>
            : row(element)
          )}
        </div>
      )
      : <div className='notification'>{placeholder}</div>
  )
}

List.propTypes = {
  elements: arrayOf(object),
  columns: arrayOf(object),
  keyFunc: func.isRequired,
  link: func,
  placeholder: string
}

List.defaultProps = {
  columns: []
}

export default List
