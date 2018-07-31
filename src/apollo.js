import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {ApolloLink} from 'apollo-link'

const uri = `${window.location.origin}/${'graphql'}`

const httpLink = new HttpLink({uri})

const cache = new InMemoryCache()

const link = ApolloLink.from([httpLink])

const client = new ApolloClient({
  link,
  cache
})

export default client
