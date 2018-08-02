import {branch, renderComponent} from 'recompose'

import {LoadingPlaceholder} from '../atoms/loading-placeholder'

export const renderWhileLoading = (propName = 'data', component = LoadingPlaceholder) =>
  branch(
    props => {
      return props.loading
      // return props[propName] && props[propName].loading
    },
    renderComponent(component),
  )
