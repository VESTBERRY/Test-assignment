import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {renderWhileLoading} from '../utils'

const companyFields = gql`
  fragment companyFields on Company {
    id
    name
    stage
    sector
    investmentSize
  }
`

/**
 *  How to omit id from fields?
 */
const getCompanies = gql`
  ${companyFields}

  query getCompanies {
    companies: company {
      ...companyFields
    }
    companiesForTable: company {
      ...companyFields
      key: id
    }
    companiesColumnsForTable: __type(name: "Company") {
      name
      fields {
        title: name
        dataIndex: name
        key: name
      }
    }
  }`

// const learnAboutCompanyType = gql`
//   query learnAboutCompanyType {
//     __type(name: "Company") {
//       kind
//       fields {
//         name
//         type {
//           name
//         }
//       }
//     }
//   }
// `

const addCompany = gql`
  ${companyFields}

  mutation ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      ...companyFields
    }
  }`

export default compose(
  graphql(getCompanies, {props: ({ownProps, data}) => data}),
  // graphql(getCompaniesForTable, {props: ({ownProps, data}) => data}),
  // graphql(learnAboutCompanyType, {props: ({ownProps, data}) => data}),
  graphql(addCompany, {name: 'addCompany'}),
  renderWhileLoading('company'),
)
