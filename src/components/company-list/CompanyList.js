import React from 'react'
import PropTypes from 'prop-types'

import pageQueries from '../../Page.queries'

import {Section, SectionTitle, SectionContent} from '../../atoms/section'
import {LoadingPlacehoder} from '../../atoms/loading-placeholder'

export const CompanyListRenderer = ({loading, company}) => {
  console.log('company', company)
  console.log('place', LoadingPlacehoder)
  console.log('sec', Section, SectionContent, SectionTitle)

  return (
    <Section>
      <SectionTitle>
        Title
      </SectionTitle>
      <SectionContent>
        {/* <LoadingPlacehoder /> */}
        Content
      </SectionContent>
    </Section>
  )
}

CompanyListRenderer.propTypes = {
  loading: PropTypes.bool,
  company: PropTypes.array
}

export const CompanyList = pageQueries(CompanyListRenderer)
