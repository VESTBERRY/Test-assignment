import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {TestAssignmentPage} from './pages/test-assignment-page'
import {Layout} from 'antd'
import client from './apollo'
// import styles from 'App.scss'

const App = () =>
  <Layout style={{
    backgroundColor: '#ebeef7',
    minHeight: '100vh'
  }}>
    <Layout.Header style={{
      textAlign: 'center'
    }}>
      <h3 style={{
        color: 'white'
      }}>
        VESTBERRY TEST ASSIGNMENT
      </h3>
    </Layout.Header>
    <Layout.Content style={{
      padding: '50px',
      backgroundColor: '#ebeef7'
    }}>
      <ApolloProvider client={client}>
        <TestAssignmentPage />
      </ApolloProvider>
    </Layout.Content>
  </Layout>

  // <div className={styles.main}>
  //   <div className={styles.header}>
  //     VESTBERRY TEST ASSIGNMENT
  //   </div>
  //   <div className={styles.content}>
  //     <ApolloProvider client={client}>
  //       <TestAssignmentPage />
  //     </ApolloProvider>
  //   </div>
  // </div>

export default App
