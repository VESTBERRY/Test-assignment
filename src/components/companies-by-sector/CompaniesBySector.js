import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import {css, cx} from 'react-emotion'
import {Row, Col} from 'antd'

import {getSectorsWithCompaniesQuery} from '../../queries/sector'
import {Section, SectionHeader, SectionContent} from '../../atoms/section'

class Renderer extends React.Component {
  render () {
    const {sectorsWithCompanies} = this.props

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
              <Row>
                {sectorsWithCompanies.data.map(({id, name, companies}) => (
                  <Col key={id} span={6} className={cx(styl.sectorTile)}>
                    <h2 className={styl.sectorCompanyCount}>{companies.length}</h2>
                    <h3 className={styl.sectorTitle}>{name}</h3>
                  </Col>
                ))}
              </Row>
            </div>
          </SectionContent>
        </Section>
      </React.Fragment>
    )
  }
}

Renderer.propTypes = {
  sectorsWithCompanies: PropTypes.object,
}

export const CompaniesBySector = compose(
  getSectorsWithCompaniesQuery
)(Renderer)

const styl = {
  sectorTile: css`
    border-right: 1px solid black;
    padding: 5px;
    text-align: center;

    &:last-child {
      border-right: 0;
    }
  `,
  sectorTitle: css`
    text-transform: uppercase;
    color: #0d7380;
    font-size: 1.5em;
  `,
  sectorCompanyCount: css`
    font-size: 1.7em;
  `
}
