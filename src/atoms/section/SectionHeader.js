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
    padding: 15px;
    width: 100%;
    background-color: #f7f9fc;
    text-transform: uppercase;
    color: #0d7380;

    h3 {
      color: inherit;
      margin-bottom: 0;
    }
  `,
}
