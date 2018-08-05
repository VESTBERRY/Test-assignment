import React from 'react'
import {compose} from 'recompose'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'
import {Table, Modal, Button, Row, Col} from 'antd'

import {getColumnsForCompaniesTableQuery, getCompaniesQuery} from '../../queries/company'
import {Section, SectionContent, SectionFooter} from '../../atoms/section'
import {AddCompanyForm} from '../add-company-form'

class Renderer extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal = () => this.setState({isModalOpen: true})
  closeModal = () => this.setState({isModalOpen: false})

  render () {
    const {companies, columnsForCompaniesTable} = this.props
    const {isModalOpen} = this.state

    return (
      <React.Fragment>
        <Modal
          visible={isModalOpen}
          onOk={this.closeModal}
          width="80vw"
          footer={null}
          onCancel={this.closeModal}
        >
          <Row>
            <Col span="6" />
            <Col span="12">
              <AddCompanyForm onSubmitSuccess={this.closeModal} />
            </Col>
            <Col span="6" />
          </Row>
        </Modal>

        <Section>
          <SectionContent className={cx(styl.tableWrapper)}>
            <Table
              pagination={false}
              dataSource={companies.data}
              rowClassName={cx(styl.rowStyle)}
              columns={columnsForCompaniesTable.data.fields}
            />
          </SectionContent>
          <SectionFooter>
            <div style={{
              textAlign: 'center',
              padding: '10px'
            }}>
              <Button type="normal" size="large" onClick={this.openModal}>
                Add new company
              </Button>
            </div>
          </SectionFooter>
        </Section>
      </React.Fragment>
    )
  }
}

Renderer.propTypes = {
  companies: PropTypes.object,
  columnsForCompaniesTable: PropTypes.object,
}

export const CompanyList = compose(
  getCompaniesQuery,
  getColumnsForCompaniesTableQuery,
)(Renderer)

const styl = {
  root: css`
  `,
  tableWrapper: css`
    .ant-table-thead {
      tr {
        th {
          background-color: #f7f9fc;
          text-transform: uppercase;
          color: #0d7380;
          font-size: 1.17em;
        }
      }
    }
    .ant-table-tbody {
      tr {
        td {
          color: #394c52;
        }
      }
    }
  `,
  rowStyle: css`
    padding-left:5px;
    padding-right: 5px;
    padding-top: 0px;
    padding-bottom: 0px;
  `
}
