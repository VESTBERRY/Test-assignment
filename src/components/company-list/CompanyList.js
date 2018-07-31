import React from 'react'
import PropTypes from 'prop-types'

import pageQueries from '../../Page.queries'

import {Section, SectionHeader, SectionContent} from '../../atoms/section'

// import {CompanyListItem} from './CompanyListItem'

export const CompanyListRenderer = ({loading, company: companies}) => {
  console.log('company', companies)

  // return (
  //   <table>
  //     <tr>
  //       <th>COMPANY NAME</th>
  //       <th>STAGE</th>
  //       <th>SECTOR</th>
  //       <th>INVESTMENT SIZE</th>
  //     </tr>
  //     {
  //       company.map((company, i) =>
  //         <tr key={i}>
  //           <td>{company.name}</td>
  //           <td>{company.stage}</td>
  //           <td>{company.sector}</td>
  //           <td>{company.investmentSize}</td>
  //         </tr>
  //       )
  //     }
  //   </table>
  // )

  return (
    <React.Fragment>
      <Section>
        <SectionHeader>
          CompanyList
        </SectionHeader>
        <SectionContent>
          {companies.map(company => (
            <div key={company.id}>
              {company.name} | {company.stage} | {company.sector} | {company.investmentSize}
            </div>
          ))}
        </SectionContent>
      </Section>
    </React.Fragment>
  )
}

CompanyListRenderer.propTypes = {
  loading: PropTypes.bool,
  company: PropTypes.array
}

export const CompanyList = pageQueries(CompanyListRenderer)
