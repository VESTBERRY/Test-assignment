import React from 'react'
import PropTypes from 'prop-types'
import {Formik, FormikConsumer} from 'formik'
import * as Yup from 'yup'
import {css, cx} from 'react-emotion'
import {compose} from 'react-apollo'
import {Input, Select, Layout, Button, Form} from 'antd'
import companyQueries from '../../queries/company'
import sectorQueries from '../../queries/sector'
import stageQueries from '../../queries/stage'

const FormItemFeedback = ({children, name}) => (
  <FormikConsumer>
    {({errors, touched, submitCount}) => {
      return (
        <Form.Item
          hasFeedback={submitCount > 0 || (!!errors[name] && touched[name])}
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
const TextField = ({name, placeholder}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched}) => (
      <FormItemFeedback name={name}>
        <Input
          type="text"
          placeholder={placeholder}
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
  placeholder: PropTypes.string,
}
const MoneyField = ({name, placeholder, currency}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched}) => (
      <FormItemFeedback name={name}>
        <Input
          value={values[name]}
          style={{
            width: '100%',
          }}
          min={0}
          placeholder={placeholder}
          onBlur={() => setFieldTouched(name)}
          onChange={event => setFieldValue(name, event.target.value)}
          addonAfter={currency}
        />
      </FormItemFeedback>
    )}
  </FormikConsumer>
)
MoneyField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  currency: PropTypes.string,
}
const SelectField = ({name, selectOptions, defaultOption}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched}) => (
      <FormItemFeedback name={name}>
        <Select
          onChange={event => setFieldValue(name, event.target.value)}
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
 */
const AddCompanyFormRenderer = ({stage, sector, companyTypeForm, addCompany}) => (
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
      console.log('values', values)
      try {
        const company = await addCompany({variables: {...values}})
        console.log('company', company)
      } catch (mutationErrors) {
        const formikErrors = transformMutationErrorToFormikErrors(mutationErrors)
        formik.setErrors(formikErrors)
      }
    }}
    render={formik => {
      return (
        <div>
          <Layout>
            <Layout.Header style={{
              textAlign: 'center'
            }}>
              <h2>ADD NEW COMPANY</h2>
            </Layout.Header>
            <Layout.Content>
              <Form layout="vertical">
                <TextField name="name" placeholder="Company name" />
                <SelectField name="stage" defaultOption={stage[0]} selectOptions={stage} />
                <SelectField name="sector" defaultOption={sector[0]} selectOptions={sector} />
                <MoneyField name="investmentSize" placeholder="Enter amount" currency="EUR" />
              </Form>
            </Layout.Content>
            <Layout.Footer style={{
              textAlign: 'center'
            }}>
              <Button type="button" onClick={() => formik.submitForm()}>
                Add New Company
              </Button>
            </Layout.Footer>
          </Layout>
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
