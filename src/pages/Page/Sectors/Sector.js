import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sector.scss'

import Fintech from '../../../../Assets/Assetts/Icons/ico_fintech.svg'
import Insuretech from '../../../../Assets/Assetts/Icons/ico_insurtech.svg'
import Iot from '../../../../Assets/Assetts/Icons/ico_iot.svg'
import Roboadvisory from '../../../../Assets/Assetts/Icons/ico_roboadvisory.svg'

export const Sector = ({companies}) => {
  //  Construct a new company array groupped by the sector
  const bySector = React.useMemo(() => {
    return companies.reduce((acc, obj) => {
      const idx = acc.findIndex(o => o.sector === obj.sector)
      if (idx !== -1) {
        acc[idx].companies.push(obj)
      } else {
        acc.push({
          sector : obj.sector,
          companies: [obj],
        })
      }
      return acc
    }, [])
  }, [companies])
  //  Return each asset based on sector
  const getAsset = (sector) => {
    switch (sector) {
      case 'IOT' : return <Iot />
      case 'Fintech' : return <Fintech />
      case 'Insuretech' : return <Insuretech />
      case 'Roboadvisory' : return <Roboadvisory />
    }
  }
  // Render the contents
  return (
    <div className={styles.container}>
      <div className={styles.sector}>
        <p className={styles.sectorTitle}>COMPANIES BY SECTORS</p>
      </div>
      <div className={styles.sectorContent}>
        {bySector.map(s =>
          <div className={styles.sectorObject} key={s.sector}>
            <h2>{s.companies.length}</h2>
            <h6>{s.sector.toUpperCase()}</h6>
            <span className={styles.icon}>
              {getAsset(s.sector)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

Sector.propTypes = {
  companies: PropTypes.array,
}

export default Sector
