const express = require('express')
const compress = require('compression')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')

const app = express()

app.use(compress())

app.use('/graphql', graphqlHTTP(req =>
  ({
    schema: schema,
    context: req,
    graphiql: true,
  })
))

app.listen(8000, 'localhost', () => {
  console.debug('Server is running at http://localhost:8000')
})

// export default app
