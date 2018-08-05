import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {TestAssignmentPage} from './pages/test-assignment-page'
import {Layout} from 'antd'
import client from './apollo'
import {css, cx} from 'react-emotion'

const App = () =>
  <Layout className={cx(styl.layout)}>
    <Layout.Header className={cx(styl.header)}>
      <h3 className={cx(styl.headerTitle)}>
        VESTBERRY TEST ASSIGNMENT
      </h3>
    </Layout.Header>
    <Layout.Content className={cx(styl.content)}>
      <ApolloProvider client={client}>
        <TestAssignmentPage />
      </ApolloProvider>
    </Layout.Content>
  </Layout>

export default App

const styl = {
  layout: css`
    background-color: #ebeef7;
    min-height: 100vh;
  `,
  header: css`
    text-align: center;
  `,
  headerTitle: css`
    color: white;
  `,
  content: css`
    padding: 25px 50px;
    background-color: #ebeef7;
  `
}
