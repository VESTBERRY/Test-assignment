import React from 'react'
import PropTypes from 'prop-types'
import styles from './Investment.scss'

import Doughnut from './Doughnut/Dougnut'

export const Investment = ({companies}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sector}>
        <p className={styles.sectorTitle}>COMPANIES BY INVESTMENT SIZE</p>
      </div>
      <div className={styles.chart}>
        <Doughnut data={companies} />
      </div>
    </div>
  )
}

Investment.propTypes = {
  companies: PropTypes.array,
}

export default Investment
