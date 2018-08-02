import React from 'react'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'

export const SectionHeader = ({children, className}) => {
  return (
    <div className={cx(styl.root, className)}>
      {children}
    </div>
  )
}

SectionHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
}

SectionHeader.defaultProps = {
  children: null,
  className: null,
}

const styl = {
  root: css`
    // border: 1px solid blue;
    background-color: #f7f9fc;
    padding: 5px;
    width: 100%;
  `,
}
