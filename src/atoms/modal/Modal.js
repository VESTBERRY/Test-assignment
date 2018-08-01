import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import {css, cx} from 'react-emotion'

import './modal.scss'

ReactModal.setAppElement('#root')

export class ModalRenderer extends React.Component {
  closeModal = () => {
    this.props.onRequestClose()
  }

  render () {
    const {styles, isOpen, ...modalProps} = this.props

    return (
      <React.Fragment>
        <ReactModal
          {...modalProps}
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          style={styles}
          // closeTimeoutMS={500}
        >
          {modalProps.children({closeModal: this.closeModal, openModal: this.openModal})}
          <div
            className={cx(styl.closeButton)}
            onClick={this.closeModal}
          >
            Close
          </div>
        </ReactModal>
      </React.Fragment>
    )
  }
}

ModalRenderer.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  styles: PropTypes.object,
}

export const Modal = props => (
  <ModalRenderer
    {...props}
    styles={styl.modal}
  />
)

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
}

const styl = {
  modal: {
    content: {
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      boxShadow: '0 0.5px 10px 0 rgba(0,0,0,0.13)',
      // top: 0,
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // transform: 'translate(-50%, -100%)',
      // padding: '52px 15px 39px 15px',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
  closeButton: css`
    position: absolute;
    top: 26px;
    right: 31px;
    width: 18px;
    height: 18px;
    cursor: pointer;

    i:before {
      display: block;
    }
  `
}
