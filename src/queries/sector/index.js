import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {renderWhileLoading} from '../utils'

const getSectors = gql`
    query getSectors {
      sector
    }
  `

export default compose(
  graphql(getSectors, {
    props: ({ownProps, data}) => data,
  }),
  renderWhileLoading('sector'),
)
