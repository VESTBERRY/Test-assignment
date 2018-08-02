import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'

import companyQueries from '../../queries/company'
import {Modal} from '../../atoms/modal'
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
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
        >
          {modal => <AddCompanyForm />}
        </Modal>
        <Section>
          <SectionContent>
            <Table dataSource={companiesForTable} columns={companiesColumnsForTable.fields} />
          </SectionContent>
          <SectionFooter>
            <button onClick={this.openModal}>
              Add company
            </button>
          </SectionFooter>
        </Section>
      </React.Fragment>
    )
  }
}

CompanyListRenderer.propTypes = {
  // companies: PropTypes.array,
  companiesForTable: PropTypes.array,
  companiesColumnsForTable: PropTypes.array,
}

CompanyListRenderer.defaultProps = {
  companies: [],
  companiesForTable: [],
  companiesColumnsForTable: [],
}

export const CompanyList = companyQueries(CompanyListRenderer)
