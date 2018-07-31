import React from 'react'
import PropTypes from 'prop-types'

import pageQueries from './Page.queries'

import {CompaniesBySector} from './components/companies-by-sector'
import {CompaniesBySize} from './components/companies-by-size'
import {CompanyList} from './components/company-list'

export const Page = ({company, loading}) => {
  // if (loading) {
  //   return <span>Loading data...</span>
  // }

  console.log('Page', company, loading)

  return (
    <React.Fragment>
      {/* <CompaniesBySector></CompaniesBySector>
      <CompaniesBySize></CompaniesBySize> */}
      <CompanyList></CompanyList>
    </React.Fragment>
  )

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
