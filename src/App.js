import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {TestAssignmentPage} from './pages/test-assignment-page'
import client from './apollo'
import styles from 'App.scss'

const App = () =>
  <div className={styles.main}>
    <div className={styles.header}>
      VESTBERRY TEST ASSIGNMENT
    </div>
    <div className={styles.content}>
      <ApolloProvider client={client}>
        <TestAssignmentPage />
      </ApolloProvider>
    </div>
  </div>

export default App
