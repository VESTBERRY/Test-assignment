import React from 'react'
import {GET_COMPANIES} from './Page.queries'
import {useQuery} from '@apollo/client'

export const Page = () => {
  const {loading, error, data: companyData} = useQuery(GET_COMPANIES)

  if (loading) {
    return <span>Loading data...</span>
  }

  if (error) {
    return (
      <span>
        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      </span>
    )
  }

  const {companies} = companyData

  return (
    <table>
      <tr>
        <th>COMPANY NAME</th>
        <th>STAGE</th>
        <th>SECTOR</th>
        <th>INVESTMENT SIZE</th>
      </tr>
      {
        companies.map((company, i) => (
          <tr key={i}>
            <td>{company.name}</td>
            <td>{company.stage}</td>
            <td>{company.sector}</td>
            <td>{company.investmentSize}</td>
          </tr>
        ))
      }
    </table>
  )
}

export default Page
