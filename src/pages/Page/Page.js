import React from 'react'
import {GET_COMPANIES} from './Page.queries'
import {useQuery} from '@apollo/client'

import Sector from './Sectors/Sector'
import Investment from './Investment/Investment'
import Table from './Table/Table'

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
    <div>
      <br />
      <Sector companies={companies} />
      <br />
      <Investment companies={companies} />
      <br />
      <Table companies={companies} />
      <br />
    </div>
  )
}

export default Page
