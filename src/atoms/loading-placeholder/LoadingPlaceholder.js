import React from 'react'
import {css, cx} from 'react-emotion'
import {Icon} from 'antd'

export const LoadingPlaceholder = () => (
  <div className={cx(styl.root)}>
    <Icon type="loading" />
  </div>
)

const styl = {
  root: css`
    display: block;
    text-align: center;
    height: 200px;
    // background-color: red;
  `,
}
