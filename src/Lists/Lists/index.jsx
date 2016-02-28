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
import { allTrim, userUid } from '../../utils';

const styles = {
  label: { color: Colors.deepOrange600 }
};

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true
    };
  }

  componentWillMount() {
    const { history, auth } = this.props;
    auth.uid || history.replaceState(null, '/');
    auth.uid && this.props.registerListeners(userUid(auth.uid));
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    const { auth } = this.props;
    auth.uid && this.props.unregisterListeners(userUid(auth.uid));
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
    } else {
      this.props.createList(title, desc, userId);
      this.setState({editing: false});
    }
  }

  _getLists(label, lists) {
    const { navigate, user } = this.props;
    return (
      <div>
        <h3 className="center-wrapper" style={styles.label}> { label } </h3>
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
      </div>
    );
  }

  render() {
    const { lists, defaultLists } = this.props;
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
        { this._getLists.bind(this)('General lists', defaultLists)}
        { this._getLists.bind(this)('Custom lists', lists)}
        <div className="center-wrapper">{button}</div>
        { dialog }
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
  history: PropTypes.object,
  auth: PropTypes.object,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

Lists.defaultProps = {
  lists: []
};
