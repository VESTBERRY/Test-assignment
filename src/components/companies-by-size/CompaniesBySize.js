import React from 'react'
import PropTypes from 'prop-types'
// import {Table, Modal, Button, Row, Col} from 'antd'
// import {PieChart} from 'react-d3-basic'
import {Doughnut} from 'react-chartjs-2'
// import casual from 'casual'
import tinycolor from 'tinycolor2'

import companyQueries from '../../queries/company'
import {Section, SectionHeader, SectionContent, SectionFooter} from '../../atoms/section'

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// TODO move somewhere else so its not called on each render....
const transformCompaniesForChart = companies => {
  // console.log('companies', companies)

  const data = []
  const labels = []
  const bgColor = []
  companies.forEach(company => {
    labels.push(company.name)
    data.push(company.investmentSize)
    // bgColor.push(casual.rgb_hex)
    // bgColor.push(`#${tinycolor.random().toHex()}`)
    bgColor.push(company.color)
  })

  return {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: bgColor
    }]
  }
}

class CompaniesBySizeRenderer extends React.Component {
  constructor (props) {
    super(props)

    // console.log('propqq', props)

    this.state = {
      chartData: transformCompaniesForChart(props.companies)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.companies.length !== this.props.companies.length) {
      this.setState({
        chartData: transformCompaniesForChart(this.props.companies)
      })
    }
  }

  render () {
    // const {companies} = this.props
    // console.log('propz', this.props)
    // const companiesDataForDonut = transformCompaniesForChart(companies)
    // console.log(companiesDataForDonut)

    // const data = {
    //   labels: [
    //     'Red',
    //     'Green',
    //     'Yellow'
    //   ],
    //   datasets: [{
    //     data: [300, 50, 100],
    //     backgroundColor: [
    //       '#FF6384',
    //       '#36A2EB',
    //       '#FFCE56'
    //     ],
    //     hoverBackgroundColor: [
    //       '#FF6384',
    //       '#36A2EB',
    //       '#FFCE56'
    //     ]
    //   }]
    // }

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>
            <h3>Companies by investment size</h3>
          </SectionHeader>
          <SectionContent>
            <Doughnut data={this.state.chartData} />
          </SectionContent>
          <SectionFooter>
            Footer
          </SectionFooter>
        </Section>
      </React.Fragment>
    )
  }
}

CompaniesBySizeRenderer.propTypes = {
  companies: PropTypes.array,
}

CompaniesBySizeRenderer.defaultProps = {
  companies: [],
}

export const CompaniesBySize = companyQueries(CompaniesBySizeRenderer)
