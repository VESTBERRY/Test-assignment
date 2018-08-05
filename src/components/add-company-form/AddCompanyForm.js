import React from 'react'
import PropTypes from 'prop-types'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {css, cx} from 'react-emotion'
import {compose} from 'recompose'
import {Button, Form, Row, Col} from 'antd'
import {addCompanyMutation} from '../../queries/company'
import {getStagesQuery} from '../../queries/stage'
import {getSectorsQuery} from '../../queries/sector'
import {MoneyField, TextField, SelectField} from '../../atoms/form/atoms'

const transformMutationErrorToFormikErrors = mutationError => {
  const [error] = mutationError.graphQLErrors
  const {state} = error
  return {...state}
}

const Renderer = (props) => {
  const {stages, sectors, addCompany, onSubmitSuccess} = props
  const defaultStage = stages.data[0].name
  const defaultSector = sectors.data[0].name

  return (
    <Formik
      initialValues={{
        name: '',
        stage: defaultStage,
        sector: defaultSector,
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
        // console.log('formik', formik)
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
        // console.log('formik', formik)
        // console.log('formik.values', formik.values)
        return (
          <div>
            <Row>
              <Col style={{
                textAlign: 'center'
              }}>
                <h2 className={cx(styl.modalTitle)}>Add new company</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form layout="vertical">
                  <TextField name="name" placeholder="Company name" label="Company name" />
                  <SelectField
                    name="stage"
                    defaultOption={defaultStage} selectOptions={stages.data.map(s => s.name)} label="Stage"
                  />
                  <SelectField
                    name="sector"
                    defaultOption={defaultSector} selectOptions={sectors.data.map(s => s.name)} label="Sector"
                  />
                  <MoneyField name="investmentSize" placeholder="Enter amount" currency="EUR" label="Investment size" />
                </Form>
              </Col>
            </Row>
            <Row>
              <Col style={{
                textAlign: 'center'
              }}>
                <Button
                  type="primary"
                  size="large"
                  className={cx(styl.submitButton)}
                  onClick={() => formik.submitForm()}
                >
                  Add new company
                </Button>
              </Col>
            </Row>
          </div>
        )
      }}
    />
  )
}

Renderer.propTypes = {
  addCompany: PropTypes.func,
  sectors: PropTypes.object,
  stages: PropTypes.object,
  onSubmitSuccess: PropTypes.func
}

export const AddCompanyForm = compose(
  addCompanyMutation,
  getStagesQuery,
  getSectorsQuery,
)(Renderer)

const styl = {
  modalTitle: css`
    text-transform: uppercase;
    color: #0d7380;
  `,
  submitButton: css`
    background-color: #0d7380;
    border-color: #0d7380;
    color: white;
  `
}
