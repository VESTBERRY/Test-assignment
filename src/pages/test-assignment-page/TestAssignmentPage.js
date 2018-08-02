import React from 'react'

import {CompanyList} from '../../components/company-list'

export const TestAssignmentPageRenderer = () => (
  <React.Fragment>
    {/* <CompaniesBySector /> */}
    {/* <CompaniesBySize /> */}
    <CompanyList />
  </React.Fragment>
)

export const TestAssignmentPage = TestAssignmentPageRenderer
