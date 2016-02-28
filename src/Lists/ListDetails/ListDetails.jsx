import React, { Component, PropTypes } from 'react';
import Spinner from '../../Widgets/Spinner';
import CommentsManager from '../../Comments';
import EntriesList from './EntriesList';
import Color from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import { allTrim } from '../../utils';
import ShareIcon from '../../Widgets/ShareIcon';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';
import ScrollTop from '../../Widgets/ScrollTop';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { isEmpty } from 'lodash';

const styles = {
  dialog: { textAlign: 'justify' },
  cardActions: { display: 'flex', width: '90%', justifyContent: 'space-between', margin: '0 auto' },
  editIcon: { color: Color.grey400 },
  deleteIcon: { color:Color.red900 },
  subtitle: { width: '90%', textAlign: 'justify' },
  inkBar: { backgroundColor: Colors.deepOrange800, height:'0.3em', marginTop: '-0.3em' },
  tab: {backgroundColor: Colors.orange600}

};

export default class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      deleting: false,
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps){
    if (prevProps.params.listsSlug !== this.props.params.listsSlug) {
      this.props.registerListeners(this.props.params);
    }
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.params, this.props.list.id);
  }

    _handleEditButtonTouchTap() {
    this.setState({editing: true});
  }

  _handleRequestCloseEdit() {
    this.setState({editing: false});
  }

  _handleDeleteButtonTouchTap() {
    this.setState({deleting: true});
  }

  _handleRequestCloseDelete() {
    this.setState({deleting: false});
  }

  _handleRequestSubmitEdit() {
    const { id } = this.props.list;
    const titleNode = this.refs.listTitle;
    const descNode = this.refs.listDesc;
    const title = allTrim(titleNode.getValue());
    const desc = allTrim(descNode.getValue());
    if (!title) {
      titleNode.setErrorText('You must choose a title');
      titleNode.setValue('');
      titleNode.focus();
    }else {
      const { userName } = this.props.user;
      this.props.editListAndNavigate(userName, id, title, desc);
      this.setState({editing: false});
    }
  }

  _handleRequestSubmitDelete() {
    const { id } = this.props.list;
    const { userName } = this.props.user;
    setTimeout(() =>{
      this.setState({editing: false});
      this.props.deleteListAndNavigate(userName, id);
    }, 0);
  }

  render() {
    const { loading } = this.state;
    const { list, addEntry, removeEntry, navigate, movies, user, params } = this.props;

    if (loading || isEmpty(list)){
      return <Spinner/>;
    }

    const custom = list.custom;
    const owner = params.user === user.userName;
    const listTitle = list.title;
    const subtitle = list.desc;
    const editDialogActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary
        onTouchTap={this._handleRequestCloseEdit.bind(this)} />,
      <FlatButton
        key={1}
        label="Edit list"
        secondary
        onTouchTap={this._handleRequestSubmitEdit.bind(this)} />
      ];

    const editDialog = (
        <Dialog
          title="Edit a list"
          actions={editDialogActions}
          open={this.state.editing}
          onRequestClose={this._handleRequestCloseEdit.bind(this)}
          >
          <TextField
            defaultValue={listTitle}
            ref="listTitle"
            onEnterKeyDown={this._handleRequestSubmitEdit.bind(this)}
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

    const deleteDialogActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary
        onTouchTap={this._handleRequestCloseDelete.bind(this)} />,
      <FlatButton
        key={1}
        label="Delete list"
        secondary
        onTouchTap={this._handleRequestSubmitDelete.bind(this)} />
      ];

    const deleteDialog = (
        <Dialog
          actions={deleteDialogActions}
          open={this.state.deleting}
          onRequestClose={this._handleRequestCloseDelete.bind(this)}
          style={styles.dialog}
          >
          Are you sure you want to remove the "{listTitle}" list?
        </Dialog>
        );

    const cardActions = (custom && owner) ? (<CardActions
        style={styles.cardActions}
        expandable={custom && owner}>
        <IconButton
          iconClassName="material-icons"
          iconStyle={styles.editIcon}
          onTouchTap={this._handleEditButtonTouchTap.bind(this)}
          tooltip="Edit list"
          tooltipPosition="top-center"
        >edit</IconButton>
        <IconButton
          iconClassName="material-icons"
          iconStyle={styles.deleteIcon}
          onTouchTap={this._handleDeleteButtonTouchTap.bind(this)}
          tooltip="Delete list"
          tooltipPosition="top-center"
        >clear</IconButton>
      </CardActions>
      ) : '';

    const social = (
      <CardText>
        <ShareIcon text="Check this list"/>
      </CardText>
      );

    return (
      <div>
        <Card>
          <CardTitle
            title={listTitle}
            titleColor={Color.deepOrange500}
            subtitle={subtitle}
            subtitleStyle={styles.subtitle}
            showExpandableButton={custom && owner}/>
          {social}
          {cardActions}
          {editDialog}
          {deleteDialog}
        </Card>
        <Tabs
            inkBarStyle={styles.inkBar}
          >
            <Tab style={styles.tab}
             label="Movies">
              <EntriesList
                navigate={navigate}
                removeEntry={removeEntry}
                addEntry={addEntry}
                list={list}
                movies={movies}
                user={user}
                owner={owner}
              />
            </Tab>
            <Tab style={styles.tab}
              label="Comments">
              <CommentsManager idCommented={list.id}/>
            </Tab>
          </Tabs>
          <ScrollTop />
      </div>
    );
  }
}

ListDetails.propTypes = {
  movies: PropTypes.array,
  navigate: PropTypes.func,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func,
  list: PropTypes.object,
  params: PropTypes.object,
  user: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  editListAndNavigate: PropTypes.func,
  deleteListAndNavigate: PropTypes.func
};

ListDetails.defaultProps = {
};
