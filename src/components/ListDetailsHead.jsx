import React, { Component, PropTypes } from 'react';
import Color from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import { allTrim, getSlug } from '../utils';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class ListDetailsHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  _handleEditButtonTouchTap() {
    this.setState({editing: true});
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

    const editDialog = (
        <Dialog
          title="Edit a list"
          actions={dialogActions}
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField
            defaultValue={listTitle}
            ref="listTitle"
            onEnterKeyDown={this._handleRequestSubmit.bind(this)}
            floatingLabelText="Title"
            fullWidth
          />
          <TextField
            defaultValue={subtitle}
            ref="listDesc"
            floatingLabelText="Description"
            multiLine
            fullWidth
            rows={5}
          />
        </Dialog>
          );

    return (
     <Card>
      <CardTitle
        title={listTitle}
        titleColor={Color.deepOrange500}
        subtitle={subtitle}
        subtitleStyle={{width: "90%", textAlign: "justify"}}
        showExpandableButton/>
      <CardActions
        style={{display: "flex", width: "90%", justifyContent: "space-between", margin: "0 auto"}}
        expandable>
        <IconButton
          iconClassName="glyphicon glyphicon-edit"
          iconStyle={{color:Color.grey400}}
          onTouchTap={this._handleEditButtonTouchTap.bind(this)}
          tooltip="Edit list"
          tooltipPosition="top-center"
        />
        <IconButton
          iconClassName="glyphicon glyphicon-remove"
          iconStyle={{color:Color.red900}}
          onTouchTap={this._handleEditButtonTouchTap.bind(this)}
          tooltip="Delete list"
          tooltipPosition="top-center"
        />
      </CardActions>
      {editDialog}
    </Card>
    );
  }
}

ListDetailsHead.propTypes = {
  lists: PropTypes.object,
  list: PropTypes.object,
  editListAndNavigate: PropTypes.func,
  removeListAndNavigate: PropTypes.func
};

ListDetailsHead.defaultProps = {
  list: {}
};
