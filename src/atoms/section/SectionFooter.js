import React from 'react'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'

export const SectionFooter = ({children, className}) => {
  return (
    <div className={cx(styl.root, className)}>
      {children}
    </div>
  )
}

SectionFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
}

SectionFooter.defaultProps = {
  children: null,
  className: null,
}

const styl = {
  root: css`
    // border: 1px solid purple;
    padding: 5px;
  `,
}
