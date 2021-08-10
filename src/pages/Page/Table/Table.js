import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.scss'
import Modal from './Modal/Modal'

export const Table = ({companies}) => {
  const [modal, toggleModal] = React.useState(false)

  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <th>COMPANY NAME</th>
            <th>STAGE</th>
            <th>SECTOR</th>
            <th>INVESTMENT SIZE</th>
          </tr>
          {companies.map((company, i) => (
            <tr key={i}>
              <td>{company.name}</td>
              <td>{company.stage}</td>
              <td>{company.sector}</td>
              <td>{company.investmentSize.toLocaleString('ru-RU')} EUR</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttonWrapper}>
        <button onClick={() => toggleModal(true)}>Add new company</button>
      </div>
      <Modal open={modal} toggle={toggleModal} />
    </div>
  )
}

Table.propTypes = {
  companies: PropTypes.array,
}

export default Table
