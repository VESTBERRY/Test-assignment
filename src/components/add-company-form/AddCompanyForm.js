import React from 'react'
import PropTypes from 'prop-types'
import {Formik, Form, Field} from 'formik'
import {css, cx} from 'react-emotion'

import pageQueries from '../../Page.queries'

export class AddCompanyFormRenderer extends React.Component {
  render () {
    const {addCompany} = this.props

    console.log('addCompany', addCompany)
    console.log('Formik', Formik, Form, Field)

    return (
      <div className={cx(styl.root)}>
        AddCompanyForm
      </div>
    )
  }
}

AddCompanyFormRenderer.propTypes = {
  addCompany: PropTypes.func,
}

export const AddCompanyForm = pageQueries(AddCompanyFormRenderer)

const styl = {
  root: css`
    border: 1px solid black;
  `,
}
