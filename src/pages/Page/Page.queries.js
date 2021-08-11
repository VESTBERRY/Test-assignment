import gql from 'graphql-tag'

export const GET_COMPANIES = gql`
  query GET_COMPANIES {
    companies {
      id
      name
      stage
      sector
      investmentSize
    }
  }`

export const ADD_COMPANY = gql`
  mutation ADD_COMPANY ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      name
      stage
      sector
      investmentSize
    }
  }`
