import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from './ListItem';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import { allTrim } from '../utils';
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

  _handleRequestSubmit() {
    const titleNode = this.refs.listTitle;
    const descNode = this.refs.listDesc;
    const title = allTrim(titleNode.getValue());
    const desc = allTrim(descNode.getValue());
    if (!title) {
      titleNode.setErrorText('You must choose a title');
      titleNode.setValue('');
      titleNode.focus();
    }else {
      this.props.createList(title, desc);
      this.setState({editing: false});
    }
  }

  render() {
    const { lists, handler } = this.props;

    let dialogActions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary
        onTouchTap={this._handleRequestClose.bind(this)} />,
      <FlatButton
        key={1}
        label="Submit"
        primary
        onTouchTap={this._handleRequestSubmit.bind(this)} />
      ];

    const button = (<FloatingActionButton
                      onTouchTap={this._handleButtonClick.bind(this)}
                      iconClassName="glyphicon glyphicon-plus"
                      mini
                    />);

    return (
      <div>
        <div className="center-wrapper">{button}</div>
        <Dialog
          className = "list-add-dialog"
          ref = "dialog"
          title="Add a list"
          actions={dialogActions}
          actionFocus="submit"
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField ref="listTitle" onEnterKeyDown={this._handleRequestSubmit.bind(this)} floatingLabelText="Title" style={{width: "100%"}}/>
          <TextField ref="listDesc" floatingLabelText="Description" multiLine style={{width: "100%"}} rows={5}/>
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
  handler: PropTypes.func,
  createList: PropTypes.func
};

Lists.defaultProps = {
  lists: []
};
