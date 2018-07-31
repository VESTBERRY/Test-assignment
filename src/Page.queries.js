import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {branch, renderComponent} from 'recompose'

import {LoadingPlaceholder} from './atoms/loading-placeholder'

const getCompanies = gql`
  query getCompanies {
    company {
      id
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
    props => {
      return props.loading
      // return props[propName] && props[propName].loading
    },
    renderComponent(component),
  )

export default compose(
  graphql(getCompanies, {
    props: ({ownProps, data}) => data,
  }),
  graphql(addCompany, {name: 'addCompany'}),
  renderWhileLoading(LoadingPlaceholder, 'company'),
)
