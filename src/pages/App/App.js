import React from 'react'
import {ApolloProvider} from '@apollo/client'
import Page from '../Page/Page'
import client from '../../config/apollo'
import styles from './App.scss'

const App = () =>
  <div className={styles.main}>
    <div className={styles.header}>
      VESTBERRY TEST ASSIGNMENT
    </div>
    <div className={styles.content}>
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </div>
  </div>

export default App
