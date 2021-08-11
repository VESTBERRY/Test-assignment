import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.scss'
import VBModal from 'react-modal'
import {useMutation} from '@apollo/client'
import {ADD_COMPANY} from '../../Page.queries'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 700,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const Modal = ({open, toggle}) => {
  const [error, setError] = React.useState()
  const [addCompany] = useMutation(ADD_COMPANY)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addCompany({
        variables: {
          name: e.target.name.value,
          stage: e.target.stage.value,
          sector: e.target.sector.value,
          investmentSize: parseInt(e.target.investment.value),
        },
      })
      e.target.submit()
    } catch (error) {
      setError(error.toString())
    }
  }

  React.useEffect(() => {
    VBModal.setAppElement('body')
  }, [])

  return (
    <VBModal
      isOpen={open}
      onRequestClose={() => toggle(false)}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <h3 className={styles.modalTitle}>ADD NEW COMPANY</h3><br />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Company name</label>
        <input id="name" required placeholder="Company name" /><br />

        <label>Stage</label><br />
        <select id="stage" required defaultValue="">
          <option value="">Select stage from the list</option>
          <option value="Seed">Seed</option>
          <option value="Idea">Idea</option>
          <option value="Prototype">Prototype</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
          <option value="Series C">Series C</option>
        </select>
        <br />

        <label>Sector</label>
        <br />
        <select id="sector" required defaultValue="">
          <option value="">Select sector from the list</option>
          <option value="Fintech">Fintech</option>
          <option value="Insuretech">Insuretech</option>
          <option value="Roboadvisory">Roboadvisory</option>
          <option value="IOT">IOT</option>
        </select>
        <br />

        <label className={styles.label}>Investment size</label><br />
        <div className={styles.investment}>
          <input id="investment" required placeholder="Enter amount" className={styles.input} />
        </div>

        <input type="submit" value="Add new company" />
        <br />
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </VBModal>
  )
}

Modal.propTypes = {
  toggle: PropTypes.func,
  open: PropTypes.bool,
}

export default Modal
