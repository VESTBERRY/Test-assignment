import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Card} from 'antd'

import companyQueries from '../../queries/company'
import {Section, SectionHeader, SectionContent, SectionFooter} from '../../atoms/section'

class CompaniesBySectorRenderer extends React.Component {
  render () {
    const {companiesGroupedBySector} = this.props
    console.log('propz', this.props)

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>
            <h3>Companies by sector</h3>
          </SectionHeader>
          <SectionContent>
            <div style={{
              padding: '20px'
            }}>
              <Row gutter={16}>
                {Object.entries(companiesGroupedBySector).map(([sector, companies]) => (
                  <Col key={sector} span={4}>
                    <Card
                      title={sector}
                    >
                      <p>Number of companies {companies.length}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </SectionContent>
          <SectionFooter>
            Footer
          </SectionFooter>
        </Section>
      </React.Fragment>
    )
  }
}

CompaniesBySectorRenderer.propTypes = {
  companiesGroupedBySector: PropTypes.object,
}

export const CompaniesBySector = companyQueries(CompaniesBySectorRenderer)
