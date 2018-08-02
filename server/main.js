import express from 'express'
import compress from 'compression'
import graphqlHTTP from 'express-graphql'
import schema from 'schema'

const app = express()

app.use(compress())

app.use('/graphql', graphqlHTTP(req =>
  ({
    schema: schema,
    context: req,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    })
  })
))

app.listen(8000, 'localhost', () => {
  console.debug('Server is running at http://localhost:8000')
})

export default app
