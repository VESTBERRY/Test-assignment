import React from 'react'
// import PropTypes from 'prop-types'

// import pageQueries from './Page.queries'

// import {CompaniesBySector} from './components/companies-by-sector'
// import {CompaniesBySize} from './components/companies-by-size'
import {CompanyList} from './components/company-list'

// export const Page = ({company, loading}) => (
export const Page = () => (
  <React.Fragment>
    {/* <CompaniesBySector></CompaniesBySector>
    <CompaniesBySize></CompaniesBySize> */}
    <CompanyList />
  </React.Fragment>
)

// Page.propTypes = {
//   loading: PropTypes.bool,
//   company: PropTypes.array
// }

// export default pageQueries(Page)
export default Page
