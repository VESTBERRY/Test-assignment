import React from 'react'
import PropTypes from 'prop-types'

import pageQueries from '../../Page.queries'

import {Modal} from '../../atoms/modal'
// import ReactModal from 'react-modal'
import {Section, SectionHeader, SectionContent, SectionFooter} from '../../atoms/section'

// import {CompanyListItem} from './CompanyListItem'

class CompanyListRenderer extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal = () => this.setState({isModalOpen: true})
  closeModal = () => this.setState({isModalOpen: false})

  render () {
    const {company: companies} = this.props
    const {isModalOpen} = this.state

    // console.log('company', companies)
    // return (
    //   <table>
    //     <tr>
    //       <th>COMPANY NAME</th>
    //       <th>STAGE</th>
    //       <th>SECTOR</th>
    //       <th>INVESTMENT SIZE</th>
    //     </tr>
    //     {
    //       company.map((company, i) =>
    //         <tr key={i}>
    //           <td>{company.name}</td>
    //           <td>{company.stage}</td>
    //           <td>{company.sector}</td>
    //           <td>{company.investmentSize}</td>
    //         </tr>
    //       )
    //     }
    //   </table>
    // )

    return (
      <React.Fragment>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
        >
          {modal => (
            <div style={{width: '400px'}}>
              Modal content
            </div>
          )}
        </Modal>
        {/* <ReactModal isOpen>
          Yo
        </ReactModal> */}
        <Section>
          <SectionHeader>
            CompanyList
          </SectionHeader>
          <SectionContent>
            {companies.map(company => (
              <div key={company.id}>
                {company.name} | {company.stage} | {company.sector} | {company.investmentSize}
              </div>
            ))}
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
  company: PropTypes.array,
  // addCompany: PropTypes.func,
}

export const CompanyList = pageQueries(CompanyListRenderer)
