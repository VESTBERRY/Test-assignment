import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Button, Row, Col} from 'antd'

import companyQueries from '../../queries/company'
import {Section, SectionHeader, SectionContent, SectionFooter} from '../../atoms/section'
import {AddCompanyForm} from '../add-company-form'

class CompanyListRenderer extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal = () => this.setState({isModalOpen: true})
  closeModal = () => this.setState({isModalOpen: false})

  render () {
    const {companiesForTable, companiesColumnsForTable} = this.props
    const {isModalOpen} = this.state

    console.log('propz', this.props)

    return (
      <React.Fragment>
        <Modal
          visible={isModalOpen}
          onOk={() => {
            this.closeModal()
          }}
          footer={null}
          onCancel={() => this.closeModal()}
        >
          <AddCompanyForm onSubmitSuccess={this.closeModal} />
        </Modal>

        <Section>
          {/* <SectionHeader>
            Header
          </SectionHeader> */}
          <SectionContent>
            <Table
              // className={}
              pagination={false}
              dataSource={companiesForTable}
              columns={companiesColumnsForTable.fields}
            />
          </SectionContent>
          <SectionFooter>
            <div style={{
              textAlign: 'center',
              padding: '10px'
            }}>
              <Button type="normal" size="large" onClick={this.openModal}>
                Add Company
              </Button>
            </div>
          </SectionFooter>
        </Section>
      </React.Fragment>
    )
  }
}

CompanyListRenderer.propTypes = {
  // companies: PropTypes.array,
  companiesForTable: PropTypes.array,
  // companiesColumnsForTable: PropTypes.array,
  companiesColumnsForTable: PropTypes.object,
}

CompanyListRenderer.defaultProps = {
  companies: [],
  companiesForTable: [],
  companiesColumnsForTable: [],
}

export const CompanyList = companyQueries(CompanyListRenderer)
