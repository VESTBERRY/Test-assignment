import {branch, renderComponent} from 'recompose'
import {LoadingPlaceholder} from '../atoms/loading-placeholder'
import {graphql, compose} from 'react-apollo'

export const renderWhileLoading = (propName = 'data') => branch(
  props => {
    const prop = props[propName]

    if (prop && prop.loading) return prop.loading

    if (props.loading) return props.loading

    return false
  },
  renderComponent(LoadingPlaceholder)
)

export const graphqlWithLoading = (gql, name = 'YOU_DID_NOT_DEFINE_NAME', options = {}) => compose(
  renderWhileLoading(),
  graphql(
    gql,
    {
      name,
      options: props => ({
        ...options
      })
    }
  ),
  renderWhileLoading(name),
)
