import React from 'react'
import PropTypes from 'prop-types'
import {FormikConsumer} from 'formik'
import {css, cx} from 'react-emotion'
import {Input, Select, Form} from 'antd'

export const FormItemFeedback = ({children, name}) => (
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

export const TextField = ({name, placeholder, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched, submitForm}) => (
      <FormItemFeedback name={name}>
        <div className={cx(styl.inputLabel)}>{label}</div>
        <Input
          type="text"
          className={cx(styl.input)}
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

export const MoneyField = ({name, placeholder, currency, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched, submitForm}) => (
      <FormItemFeedback name={name}>
        <div className={cx(styl.inputLabel)}>{label}</div>
        <Input
          value={values[name]}
          className={cx(styl.input)}
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

export const SelectField = ({name, selectOptions, defaultOption, label}) => (
  <FormikConsumer>
    {({values, setFieldValue, setFieldTouched}) => (
      <FormItemFeedback name={name}>
        <div className={cx(styl.inputLabel)}>{label}</div>
        <Select
          className={cx(styl.input)}
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

const styl = {
  inputLabel: css`
    color: black;
    font-size: 12px;
    padding: 5px;
  `,
  input: css`
    width: 100%;
  `,
}
