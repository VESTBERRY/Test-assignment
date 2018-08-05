import gql from 'graphql-tag'
import {graphqlWithLoading} from '../utils'

export const fragments = gql`
  fragment sectorFragment on Sector {
    id
    name
    color
  }
`

export const getSectors = gql`
  ${fragments}
  query getSectors {
    data: sector {
      ...sectorFragment
    }
  }`

export const getSectorsWithCompanies = gql`
  ${fragments}
  query getSectorsWithCompanies {
    data: sector {
      ...sectorFragment
      companies {
        id
      }
    }
  }`

export const getSectorsQuery = graphqlWithLoading(getSectors, 'sectors')
export const getSectorsWithCompaniesQuery = graphqlWithLoading(getSectorsWithCompanies, 'sectorsWithCompanies')
