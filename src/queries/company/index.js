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

// const directives = gql`
//   directive @formType(type: String): on TYPE
// `

/**
 * @FIXME How to omit id from fields?
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
    companyTypeForm: __type(name: "CompanyTypeForm") {
      fields {
        name
        type {
          name
        }
      }
    }
    companiesColumnsForTable: __type(name: "Company") {
      fields {
        title: name
        dataIndex: name
        key: name
      }
    }
  }`

const addCompany = gql`
  ${companyFields}

  mutation ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      ...companyFields
    }
  }`

export default compose(
  graphql(getCompanies, {props: ({ownProps, data}) => data}),
  graphql(addCompany, {name: 'addCompany', options: {refetchQueries: ['getCompanies']}}),
  renderWhileLoading('company'),
)
