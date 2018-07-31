import React from 'react'
import {css, cx} from 'react-emotion'

export const LoadingPlaceholder = () => (
  <div className={cx(styl.root)}>
    LoadingPlaceholder...
  </div>
)

const styl = {
  root: css`
    display: block;
    width: 1000px;
    height: 200px;
    background-color: red;
  `,
}
