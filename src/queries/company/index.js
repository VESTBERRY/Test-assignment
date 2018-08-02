import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {graphqlLodash} from 'graphql-lodash'
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
    companiesGroupedBySector: company @_(groupBy: "sector") {
      ...companyFields
    }
    companiesColumnsForTable: __type(name: "Company") {
      fields {
        title: name
        dataIndex: name
        key: name
      }
    }
  }`

// groupBySector: companies {
//   groupBySector: @_(groupBy: "sector") {
//     sector
//   }
// }

const addCompany = gql`
  ${companyFields}

  mutation ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      ...companyFields
    }
  }`

// const {query: getCompaniesLodash, transform} = graphqlLodash(getCompanies)

export function gqlLodash (rawQuery, config) {
  const {query, transform} = graphqlLodash(rawQuery)
  let origProps = (config && config.props) || ((props) => props)

  return (comp) => graphql(query, {...config,
    props: (props) => origProps({
      ...props,
      rawData: props.data,
      data: transform(props.data)
    })
  })(comp)
}

export default compose(
  // graphql(getCompanies, {props: ({ownProps, data}) => data}),
  gqlLodash(getCompanies, {props: ({ownProps, data}) => data}),
  graphql(addCompany, {name: 'addCompany', options: {refetchQueries: ['getCompanies']}}),
  renderWhileLoading('company'),
)
