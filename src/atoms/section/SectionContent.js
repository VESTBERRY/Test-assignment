import React from 'react'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'

export const SectionContent = ({children, className}) => {
  return (
    <div className={cx(styl.root, className)}>
      {children}
    </div>
  )
}

SectionContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
}

SectionContent.defaultProps = {
  children: null,
  className: null,
}

const styl = {
  root: css`
    // border: 1px solid red;
    // padding: 5px;
  `,
}
