import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
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
    const { handler } = this.props;
    return (
      <List>
        <h3>Lists title</h3>
        <ul className="lists-wrapper">
          {
           Object.keys(lists).map( (key, index) =>  <ListItem key={index} list={lists[key]} handler={handler}/>)
          }
        </ul>
      </List>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.object,
  handler: PropTypes.func
};

Lists.defaultProps = {
  lists: {}
};
