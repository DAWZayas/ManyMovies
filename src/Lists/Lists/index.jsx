import React, { Component, PropTypes } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import ListItem from '../ListItem';
import Spinner from '../../Widgets/Spinner';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import { allTrim } from '../../utils';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.user.userName);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.user.userName);
  }

  _handleButtonTouchTap() {
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
    const userId = this.props.user.userName;
    if (!title) {
      titleNode.setErrorText('You must choose a title');
      titleNode.setValue('');
      titleNode.focus();
    }else {
      this.props.createList(title, desc, userId);
      this.setState({editing: false});
    }
  }

  render() {
    const { lists, navigate, defaultLists, user } = this.props;
    const { loading } = this.state;
    const dialogActions = [
        <FlatButton
          key={0}
          label="Cancel"
          primary
          onTouchTap={this._handleRequestClose.bind(this)}
        />,
        <FlatButton
          key={1}
          label="Add list"
          secondary
          onTouchTap={this._handleRequestSubmit.bind(this)}
        />
      ];

    const button = (
      <FloatingActionButton
        onTouchTap={this._handleButtonTouchTap.bind(this)}
        backgroundColor={Colors.deepOrange600}
        mini
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    );

    const dialog = (<Dialog
          title="Add a list"
          actions={dialogActions}
          actionFocus="submit"
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField
            ref="listTitle"
            onEnterKeyDown={this._handleRequestSubmit.bind(this)}
            floatingLabelText="Title"
            fullWidth
            />
          <TextField
            ref="listDesc"
            floatingLabelText="Description"
            multiLine
            fullWidth
            rows={5}
          />
        </Dialog>);
    return !loading ? (
      <div>
      <h3 className="center-wrapper" style={{color: Colors.deepOrange600}}> General lists </h3>
        <List>
          {
           defaultLists.map((list, index) =>  (<ListItem
             key={index}
             list={list}
             navigate={navigate}
             user={user}/>)
             )
          }
        </List>
      <h3 className="center-wrapper" style={{color: Colors.deepOrange600}}> Custom lists </h3>
        <List>
          {
           lists.map((list, index) =>  (<ListItem
             key={index}
             list={list}
             navigate={navigate}
             user={user}/>)
             )
          }
        </List>
        <div className="center-wrapper">{button}</div>
        {dialog}
      </div>
    ) : (
      <Spinner />
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array,
  defaultLists: PropTypes.array,
  navigate: PropTypes.func,
  createList: PropTypes.func,
  user: PropTypes.object,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

Lists.defaultProps = {
  lists: []
};
