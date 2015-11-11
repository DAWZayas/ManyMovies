import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';


export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addDisabled: true
    };
  }

  render() {
    const { lists } = this.props;
    return (
      <div>
        <h3>Lists title</h3>
        <ul className="lists-wrapper">
          {
           Object.keys(lists).map( (key, index) =>  <ListItem key={index} list={lists[key]}/>)
          }
        </ul>
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.object
};

Lists.defaultProps = {
  lists: {}
};
