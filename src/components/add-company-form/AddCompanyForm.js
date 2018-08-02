import React from 'react'
import PropTypes from 'prop-types'
import {Formik, FormikConsumer} from 'formik'
import * as Yup from 'yup'
import {css, cx} from 'react-emotion'
import {compose} from 'react-apollo'
import {Input, Select, Button, Form, Row, Col} from 'antd'
import companyQueries from '../../queries/company'
import sectorQueries from '../../queries/sector'
import stageQueries from '../../queries/stage'

const FormItemFeedback = ({children, name}) => (
  <FormikConsumer>
    {({errors, touched, submitCount}) => {
      const hasError = !!errors[name]
      const hasTouch = !!touched[name]
      const showFeedback = (hasError && hasTouch) || submitCount > 0

      if (!showFeedback) {
        return <Form.Item>{children}</Form.Item>
      }

      return (
        <Form.Item
          hasFeedback
          validateStatus={errors[name] && 'error'}
          help={errors[name]}
        >
          {children}
        </Form.Item>
      )
    }}
  </FormikConsumer>
)
FormItemFeedback.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
}

const TextField = ({name, placeholder, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched, submitForm}) => (
      <FormItemFeedback name={name}>
        <div>{label}</div>
        <Input
          type="text"
          placeholder={placeholder}
          onPressEnter={() => submitForm()}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={event => setFieldValue(name, event.target.value)}
        />
      </FormItemFeedback>
    )}
  </FormikConsumer>
)
TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

const MoneyField = ({name, placeholder, currency, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched, submitForm}) => (
      <FormItemFeedback name={name}>
        <div>{label}</div>
        <Input
          value={values[name]}
          style={{
            width: '100%',
          }}
          onPressEnter={() => submitForm()}
          placeholder={placeholder}
          onBlur={() => setFieldTouched(name)}
          onChange={event => {
            const {value} = event.target
            // TODO test for currency
            setFieldValue(name, value)
          }}
          addonAfter={currency}
        />
      </FormItemFeedback>
    )}
  </FormikConsumer>
)
MoneyField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  currency: PropTypes.string,
}

const SelectField = ({name, selectOptions, defaultOption, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched}) => (
      <FormItemFeedback name={name}>
        <div>{label}</div>
        <Select
          onChange={event => setFieldValue(name, event)}
          onBlur={() => setFieldTouched(name)}
          defaultValue={defaultOption}
        >
          {selectOptions.map(option => (
            <Select.Option key={option} value={option}>{option}</Select.Option>
          ))}
        </Select>
      </FormItemFeedback>
    )}
  </FormikConsumer>
)
SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  selectOptions: PropTypes.array,
  defaultOption: PropTypes.string,
}

const transformMutationErrorToFormikErrors = mutationError => {
  const [error] = mutationError.graphQLErrors
  const {state} = error
  return {...state}
}

/**
 * TODO Figure out isomorphic sharing of CompanyType schema,
 * that so we can create form from schema, handle validations, within schema
 *
 * TODO Pass around nice graphql errors after mutation
 * TODO test currency
 */
const AddCompanyFormRenderer = ({stage, sector, companyTypeForm, addCompany, onSubmitSuccess}) => (
  <Formik
    initialValues={{
      name: '',
      stage: stage[0],
      sector: sector[0],
      // investmentSize: 0,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Name is required'),
      stage: Yup.string().required('Stage is required'),
      sector: Yup.string().required('Sector is required'),
      investmentSize: Yup
        .number('Investment size must be a number')
        .required('Investment size is required'),
    })}
    onSubmit={async (values, formik) => {
      // console.log('values', values)
      console.log('formik', formik)
      try {
        await addCompany({variables: {...values}})
        formik.resetForm()
        onSubmitSuccess()
      } catch (mutationErrors) {
        if (mutationErrors && mutationErrors.graphQLErrors) {
          console.error('mutationErrors', mutationErrors.graphQLErrors)
          const formikErrors = transformMutationErrorToFormikErrors(mutationErrors)
          formik.setErrors(formikErrors)
        }
      }
    }}
    render={formik => {
      console.log('formik', formik)
      // console.log('formik.values', formik.values)
      return (
        <div>
          <Row>
            <Col style={{
              textAlign: 'center'
            }}>
              <h2>ADD NEW COMPANY</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form layout="vertical">
                <TextField name="name" placeholder="Company name" label="Company name" />
                <SelectField name="stage" defaultOption={stage[0]} selectOptions={stage} label="Stage" />
                <SelectField name="sector" defaultOption={sector[0]} selectOptions={sector} label="Sector" />
                <MoneyField name="investmentSize" placeholder="Enter amount" currency="EUR" label="Investment size" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col style={{
              textAlign: 'center'
            }}>
              <Button type="button" onClick={() => formik.submitForm()}>
                Add New Company
              </Button>
            </Col>
          </Row>
        </div>
      )
    }}
  />
)

AddCompanyFormRenderer.propTypes = {
  addCompany: PropTypes.func,
  sector: PropTypes.arrayOf(PropTypes.string),
  stage: PropTypes.arrayOf(PropTypes.string),
  companyTypeForm: PropTypes.object,
  onSubmitSuccess: PropTypes.func
}

export const AddCompanyForm = compose(
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
