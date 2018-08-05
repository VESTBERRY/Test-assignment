import gql from 'graphql-tag'
import {graphqlWithLoading} from '../utils'

export const fragments = gql`
  fragment stageFragment on Stage {
    id
    name
    color
  }
`

export const getStages = gql`
  ${fragments}
  query getStages {
    data: stage {
      ...stageFragment
    }
  }`

export const getStagesQuery = graphqlWithLoading(getStages, 'stages')
