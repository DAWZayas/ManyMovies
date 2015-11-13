import React from 'react';
import PageClick from './PageClick.jsx';

const styles = {
  popup: {
    position: 'fixed',
    top: '58%',
    left: '36%',
    width: '40%',
    height: '40%',
    marginTop: '-40%',
    marginLeft: '-20%',

    fontSize: 30,
    textAlign: 'center',

    background: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 10
  },
  shade: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    padding: 50
  }
};

const Modal = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  render() {
    const {onClose, ...props} = this.props;

    return (
      <div>
        <div style={styles.shade} />
        <PageClick>
          <div style={styles.popup}>
          <button className="close-modal" onClick={this.props.onClose}> X </button>
            <div style={styles.content} {...props} />
          </div>
        </PageClick>
      </div>
    );
  }
});


export default Modal;
