import React from 'react'

import {CompanyList} from '../../components/company-list'
import {CompaniesBySize} from '../../components/companies-by-size'
import {CompaniesBySector} from '../../components/companies-by-sector'

export const TestAssignmentPageRenderer = () => (
  <React.Fragment>
    <CompaniesBySector />
    <CompaniesBySize />
    <CompanyList />
  </React.Fragment>
)

export const TestAssignmentPage = TestAssignmentPageRenderer
