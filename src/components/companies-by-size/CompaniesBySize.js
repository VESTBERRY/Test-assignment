import React from 'react'
import PropTypes from 'prop-types'
import {Doughnut} from 'react-chartjs-2'
import {compose} from 'recompose'
import {css, cx} from 'react-emotion'

import {getCompaniesQuery} from '../../queries/company'
import {Section, SectionHeader, SectionContent} from '../../atoms/section'

const transformCompaniesForChart = companies => {
  const data = []
  const labels = []
  const bgColor = []
  companies.forEach(company => {
    labels.push(company.name)
    data.push(company.investmentSize)
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

class Renderer extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Section>
          <SectionHeader>
            <h3>Companies by investment size</h3>
          </SectionHeader>
          <SectionContent>
            <Doughnut
              data={transformCompaniesForChart(this.props.companies.data)}
              legend={{
                display: true,
                position: 'right',
                fullWidth: true,
              }}
            />
          </SectionContent>
        </Section>
      </React.Fragment>
    )
  }
}

Renderer.propTypes = {
  companies: PropTypes.object,
}

export const CompaniesBySize = compose(
  getCompaniesQuery
)(Renderer)

const styl = {
  root: css``,
}
