import React from 'react'
import PropTypes from 'prop-types'
import {withFormik, Form, Field, FormikConsumer} from 'formik'
import * as Yup from 'yup'
import {css, cx} from 'react-emotion'
import {compose} from 'react-apollo'

import companyQueries from '../../queries/company'
import sectorQueries from '../../queries/sector'
import stageQueries from '../../queries/stage'

/**
 * TODO Figure out isomorphic sharing of CompanyType schema,
 * that so we can create form from schema, handle validations, within schema
 *
 * TODO Pass around nice graphql errors after mutation
 */

const FieldWithError = ({...formikProps}) => (
  <FormikConsumer>
    {({touched, errors}) => {
      const error = errors[formikProps.name]
      const hasError = touched[formikProps.name] && errors && error

      return (
        <React.Fragment>
          <Field {...formikProps} />
          {hasError &&
            <div className={cx(styl.fieldWithError)}>{error}</div>
          }
        </React.Fragment>
      )
    }}
  </FormikConsumer>
)

const AddCompanyFormRenderer = ({stage, sector}) => (
  <FormikConsumer>
    {formik => {
      console.log('formik', formik)
      return (
        <Form>
          <div>
            <FieldWithError type="text" name="name" />
          </div>
          <div>
            <FieldWithError component="select" name="stage">
              {stage.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </FieldWithError>
          </div>
          <div>
            <FieldWithError component="select" name="sector">
              {sector.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </FieldWithError>
          </div>
          <div>
            <FieldWithError type="number" name="investmentSize" />
          </div>
          <div>
            <button disabled={!formik.dirty} type="submit">Do it 1</button>
          </div>
        </Form>
      )
    }}
  </FormikConsumer>
)

AddCompanyFormRenderer.propTypes = {
  // addCompany: PropTypes.func,
  sector: PropTypes.arrayOf(PropTypes.string),
  stage: PropTypes.arrayOf(PropTypes.string),
}

const handleSubmit = (payload, {props, setSubmitting, setErrors}) => {
  const {name, stage, sector, investmentSize} = payload

  console.log('payload', payload)

  // errors,
  // touched,
  // values,
}

export const AddCompanyForm = compose(
  withFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      stage: Yup.string().required('Stage is required'),
      sector: Yup.string().required('Sector is required'),
      investmentSize: Yup
        .number('Investment size must be a number')
        .required('Investment size is required'),
    }),
    handleSubmit: handleSubmit,
    displayName: 'AddCompanyForm'
  }),
  companyQueries,
  sectorQueries,
  stageQueries,
)(AddCompanyFormRenderer)

const styl = {
  formRoot: css`
    border: 1px solid black;
  `,
  fieldWithError: css`
    border: 1px solid red;
  `
}
