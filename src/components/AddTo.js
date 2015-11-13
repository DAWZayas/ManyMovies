import React from 'react';
import Modal from './Modal.js';
import Lists from './Lists.jsx';

export default React.createClass({
  getInitialState() {
    return {
      showLists: false,
      showCollections: false,
      showHistory: false
    };
  },

  render() {
    const {showLists} = this.state;
    const {showCollections} = this.state;
    const {showHistory} = this.state;

    return (
      <div>
        <button className="post-collections-icon" onClick={() => this.setState({showCollections: true})}> <i className="material-icons">collections_bookmark</i> </button>
        {showCollections ? (
          <Modal onClose={() => this.setState({showCollections: false})}>
            <Lists />
          </Modal>
        ) : null
        }
       <button className="post-history-icon" onClick={() => this.setState({showHistory: true})}> <i className="material-icons">history</i> </button>
        {showHistory ? (
          <Modal onClose={() => this.setState({showHistory: false})}>
            Added to history
          </Modal>
        ) : null
        }
        <button className="post-list-icon" onClick={() => this.setState({showLists: true})}>
        <i className="material-icons">playlist_add</i>
        </button>
        {showLists ? (
          <Modal onClose={() => this.setState({showLists: false})}>
            <Lists />
          </Modal>
        ) : null
        }
      </div>
    );
  }
});

