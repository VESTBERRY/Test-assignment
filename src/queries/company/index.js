/* eslint-disable max-len */

import gql from 'graphql-tag'
import {graphqlWithLoading} from '../utils'

export const companyFragment = gql`
  fragment companyFragment on Company {
    id
    name
    investmentSize
    color
    stage {
      id
      name
    }
    sector {
      id
      name
    }
  }`

export const getCompaniesForTable = gql`
    query getCompaniesForTable {
      data: company {
        key: id
        name
        sector_name
        stage_name
        formatInvestmentSize
      }
    }
  `

export const getColumnsForCompaniesTable = gql`
  query getColumnsForCompaniesTable {
    data: __type(name: "DisplayableColumnsForCompaniesTable") {
      fields {
        title: name
        dataIndex: name
        key: name
      }
    }
  }`

export const getCompanies = gql`
  ${companyFragment}
  query getCompanies {
    data: company {
      ...companyFragment
      id
      key: id
      name
      sector_name
      stage_name
      formatInvestmentSize
    }
  }`

export const addCompany = gql`
  ${companyFragment}
  mutation ($name: String!, $stage: String!, $sector: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, investmentSize: $investmentSize) {
      ...companyFragment
    }
  }`

export const getCompaniesQuery = graphqlWithLoading(getCompanies, 'companies')
export const getCompaniesForTableQuery = graphqlWithLoading(getCompaniesForTable, 'companiesForTable')
export const getColumnsForCompaniesTableQuery = graphqlWithLoading(getColumnsForCompaniesTable, 'columnsForCompaniesTable')
export const addCompanyMutation = graphqlWithLoading(addCompany, 'addCompany', {refetchQueries: ['getCompanies', 'getSectorsWithCompanies']})
