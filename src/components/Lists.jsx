import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from './ListItem';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      addDisabled: true
    };
  }

  _handleButtonClick() {
    this.setState({editing: !this.state.editing});
  }

  _handleRequestClose() {
    this.setState({editing: false});
  }

  render() {
    const { lists, handler } = this.props;

    const dialogActions = [
      { text: 'Cancel', onClick: this._handleRequestClose.bind(this), onTouchTap: this._handleRequestClose.bind(this) },
      { text: 'Submit', onClick: this._handleRequestClose.bind(this), onTouchTap: this._handleRequestClose.bind(this), ref: 'submit' }
    ];

    const button = (<FloatingActionButton
                      onClick={this._handleButtonClick.bind(this)}
                      iconClassName="glyphicon glyphicon-plus"
                      mini
                    />);

    return (
      <div>
        <div className="button-wrapper">{button}</div>
        <Dialog
          ref = "dialog"
          title="Add a list"
          actions={dialogActions}
          actionFocus="submit"
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField ref="ListTitle" floatingLabelText="Title" />
        </Dialog>
        <List>
          {
           lists.map((list, index) =>  (<ListItem
             key={index}
             list={list}
             handler={handler}
             />)
             )
          }
        </List>
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array,
  handler: PropTypes.func
};

Lists.defaultProps = {
  lists: []
};
