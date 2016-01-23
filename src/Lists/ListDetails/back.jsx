import React, { Component, PropTypes } from 'react';
import Spinner from '../../Widgets/Spinner';
import Color from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import { allTrim, getSlug, getDayHashtag } from '../../utils';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import twitter from '../../../images/twitter.png';
import Colors from 'material-ui/lib/styles/colors';
import ScrollTop from '../../components/ScrollTop';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import EntriesList from '../../components/EntriesList';
import CommentsManager from '../../components/CommentsManager';
import { isEmpty } from 'lodash';

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
    debugger;
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
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

  _handleRequestSubmitDelete() {
    const { id } = this.props.list;
    this.props.deleteListAndNavigate(id);
    this.setState({editing: false});
  }

  render() {
    const {
      lists,
      list,
      editListAndNavigate,
      deleteListAndNavigate,
      entries,
      movies,
      navigate,
      removeEntry,
      addEntry,
      comments
    } = this.props;

    const { loading } = this.state;
    const custom = list.custom;
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
          style={{textAlign: "justify"}}
          >
          Are you sure you want to remove the "{listTitle}" list?
        </Dialog>
        );

    const cardActions = custom ? (<CardActions
        style={{display: "flex", width: "90%", justifyContent: "space-between", margin: "0 auto"}}
        expandable={custom}>
        <IconButton
          iconClassName="material-icons"
          iconStyle={{color:Color.grey400}}
          onTouchTap={this._handleEditButtonTouchTap.bind(this)}
          tooltip="Edit list"
          tooltipPosition="top-center"
        >edit</IconButton>
        <IconButton
          iconClassName="material-icons"
          iconStyle={{color:Color.red900}}
          onTouchTap={this._handleDeleteButtonTouchTap.bind(this)}
          tooltip="Delete list"
          tooltipPosition="top-center"
        >clear</IconButton>
      </CardActions>
      ) : '';

    const social = (
      <CardText>
        <div style={{color: Color.white, backgroundColor: '#53d0e8', lineHeight: "2em", display: 'inline-block', padding: '0 0.5em 0 0' }}>
          <a
            style={{color: Color.white, textDecoration: 'none'}}
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=Check this list&hashtags=${getDayHashtag()},ManyMovies&url=${window.location.href}`}>
            <img style={{height: "2em"}} src={twitter} alt="twitter-logo"/>
            Share
          </a>
        </div>
      </CardText>
      );

    return !loading && !isEmpty(list) ? (
      <div>
       <Card>
        <CardTitle
          title={listTitle}
          titleColor={Color.deepOrange500}
          subtitle={subtitle}
          subtitleStyle={{width: "90%", textAlign: "justify"}}
          showExpandableButton={custom}/>
        {social}
        {cardActions}
        {editDialog}
        {deleteDialog}
      </Card>





      <Tabs
            inkBarStyle={{backgroundColor: Colors.deepOrange800, height:"0.3em", marginTop: "-0.3em"}}
          >
            <Tab style={{backgroundColor: Colors.orange600}}
             label="Movies">
              <EntriesList
                navigate={navigate}
                removeEntry={removeEntry}
                addEntry={addEntry}
                list={list}
                entries={entries}
                movies={movies}
              />
            </Tab>
            <Tab style={{backgroundColor: Colors.orange600}}
              label="Comments">
              <CommentsManager idCommented={list.id} comments={comments} />
            </Tab>
          </Tabs>
          <ScrollTop />
      </div>
    ) : (
      <Spinner />
    );
  }
}

ListDetails.propTypes = {
  lists: PropTypes.object,
  list: PropTypes.object,
  params: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  comments: PropTypes.array,
  entries: PropTypes.array,
  movies: PropTypes.object,
  navigate: PropTypes.func,
  editListAndNavigate: PropTypes.func,
  deleteListAndNavigate: PropTypes.func,
  removeEntry: PropTypes.func,
  addEntry: PropTypes.func,
};

ListDetails.defaultProps = {
  list: {},
  movies: {},
  entries: [],
  comments: []
};
