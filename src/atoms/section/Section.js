import React from 'react'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'

export const Section = ({children, className}) => {
  return (
    <div className={cx(styl.root, className)}>
      {children}
    </div>
  )
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
}

Section.defaultProps = {
  children: null,
  className: null,
}

const styl = {
  root: css`
    border: 1px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
}