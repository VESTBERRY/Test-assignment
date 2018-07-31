import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'

const getCompanies = gql`
  query getCompanies {
    company {
      name
      stage
      sector
      investmentSize
    }
  }`

const addCompany = gql`
  mutation ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      name
      stage
      sector
      investmentSize
    }
  }`

export default compose(
  graphql(getCompanies, {
    props: ({ownProps, data}) => data,
  }),
  graphql(addCompany, {name: 'addCompany'}),
)
