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
    const testList = Object.assign({}, lists);
    return (
      <div>
        <h3>Lists title</h3>
        <ul className="lists-wrapper">
          {
           Object.keys(testList).map( (list, index) =>  <ListItem key={index} list={list}/>)
          }
        </ul>
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array,
};

Lists.defaultProps = {
  lists: []
};
