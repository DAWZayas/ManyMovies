import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import FontIcon from 'material-ui/lib/font-icon';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import { allTrim, getSlug } from '../utils';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  _handleButtonTouchTap() {
    this.setState({editing: !this.state.editing});
  }

  _handleRequestClose() {
    this.setState({editing: false});
  }

  _handleRequestSubmit() {
    const { id } = this.props.list;
    const { lists } = this.props;
    const titleNode = this.refs.listTitle;
    const descNode = this.refs.listDesc;
    const title = allTrim(titleNode.getValue());
    const desc = allTrim(descNode.getValue());
    if (!title) {
      titleNode.setErrorText('You must choose a title');
      titleNode.setValue('');
      titleNode.focus();
    }else {
      const slug = getSlug(lists, title, id);
      this.props.editListAndNavigate(id, title, desc, slug);
      this.setState({editing: false});
    }
  }

  render() {
    const { list } = this.props;
    const listTitle = list.title;
    const subtitle = list.desc;

    const dialogActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary
        onTouchTap={this._handleRequestClose.bind(this)} />,
      <FlatButton
        key={1}
        label="Edit list"
        secondary
        onTouchTap={this._handleRequestSubmit.bind(this)} />
      ];

    const dialog = (
        <Dialog
          className = "list-add-dialog"
          ref = "dialog"
          title="Edit a list"
          actions={dialogActions}
          actionFocus="submit"
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField defaultValue={listTitle} ref="listTitle" onEnterKeyDown={this._handleRequestSubmit.bind(this)} floatingLabelText="Title" style={{width: "100%"}}/>
          <TextField defaultValue={subtitle} ref="listDesc" floatingLabelText="Description" multiLine style={{width: "100%"}} rows={5}/>
        </Dialog>
          );

    return (
     <Card>
      <CardTitle title={listTitle} subtitle={subtitle}/>
      <CardActions style={{float: "right"}}>
        <FontIcon onTouchTap={this._handleButtonTouchTap.bind(this)} className="glyphicon glyphicon-edit"/>
      </CardActions>
      {dialog}
    </Card>
    );
  }
}

ListDetails.propTypes = {
  lists: PropTypes.object,
  list: PropTypes.object,
  editListAndNavigate: PropTypes.func
};

ListDetails.defaultProps = {
  list: {}
};
