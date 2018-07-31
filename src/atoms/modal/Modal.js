import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export class ModalRenderer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReactModal>
        </ReactModal>
      </React.Fragment>
    )
  }
}

export const Modal = (props) => (
  <ModalRenderer {...props} styles={styl.modal} />
)

const styl = {
  modal: {
    content: {
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      boxShadow: '0 0.5px 10px 0 rgba(0,0,0,0.13)',
      top: 0,
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -100%)',
      padding: '52px 15px 39px 15px',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
}
