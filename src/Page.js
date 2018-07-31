import React from 'react'
import PropTypes from 'prop-types'
import pageQueries from './Page.queries'

export const Page = ({company, loading}) => {
  if (loading) {
    return <span>Loading data...</span>
  }

  return (
    <table>
      <tr>
        <th>COMPANY NAME</th>
        <th>STAGE</th>
        <th>SECTOR</th>
        <th>INVESTMENT SIZE</th>
      </tr>
      {
        company.map((company, i) =>
          <tr key={i}>
            <td>{company.name}</td>
            <td>{company.stage}</td>
            <td>{company.sector}</td>
            <td>{company.investmentSize}</td>
          </tr>
        )
      }
    </table>
  )
}

Page.propTypes = {
  loading: PropTypes.bool,
  company: PropTypes.array
}

export default pageQueries(Page)
