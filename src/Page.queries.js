import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {branch, renderComponent} from 'recompose'

import {LoadingPlacehoder} from './atoms/loading-placeholder'

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

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  )

export default compose(
  graphql(getCompanies, {
    props: ({ownProps, data}) => data,
  }),
  renderWhileLoading(LoadingPlacehoder, 'company'),
  graphql(addCompany, {name: 'addCompany'}),
)
