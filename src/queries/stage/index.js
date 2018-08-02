import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {renderWhileLoading} from '../utils'

const getStages = gql`
    query getStages {
      stage
    }
  `

export default compose(
  graphql(getStages, {
    props: ({ownProps, data}) => data,
  }),
  renderWhileLoading('stage'),
)
