import React from 'react'
import PropTypes from 'prop-types'
// import {Table, Modal, Button, Row, Col} from 'antd'
// import {PieChart} from 'react-d3-basic'

import companyQueries from '../../queries/company'
import {Section, SectionHeader, SectionContent, SectionFooter} from '../../atoms/section'

class CompaniesBySizeRenderer extends React.Component {
  render () {
    const {companies} = this.props
    console.log('propz', this.props)

    const series = [
      {
        "field": "<5",
        "name": "less than 5"
      },
      {
        "field": "5-13",
        "name": "5 to 13"
      },
      {
        "field": "14-17",
        "name": "14 to 17"
      },
      {
        "field": "18-24",
        "name": "18 to 24"
      },
      {
        "field": "25-44",
        "name": "25 to 44"
      },
      {
        "field": "45-64",
        "name": "45 to 64"
      }
    ]

    const name = d => d.age
    const value = d => +d.population

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>
            <h3>Companies by investment size</h3>
          </SectionHeader>
          <SectionContent>
            {/* <PieChart
              width={700}
              height={700}
              value={value}
              name={name}
              chartSeries={series}
              innerRadius={10}
            /> */}
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
