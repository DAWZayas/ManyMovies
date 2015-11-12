import React from 'react';

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const FlatButton = require('material-ui/lib/flat-button');

export default React.createClass({
  render() {
    return (
      <Card>
        <CardHeader title="Title"/>
        <CardMedia className="film-cover" overlay={
           <CardTitle title="Title">
            <li className="post-icon">
             <button className="post-collections-icon"> <i className="material-icons">collections_bookmark</i> </button>
             <button className="post-history-icon"> <i className="material-icons">history</i> </button>
             <button className="post-list-icon"> <i className="material-icons">playlist_add</i> </button>
            </li>
          </CardTitle>
          }>
          <img src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
        </CardMedia>
        <CardActions className="card-actions">
         <li> <FlatButton label="Add to Collection"/> </li>
         <li> <FlatButton label="Add to history"/> </li>
         <li> <FlatButton label="Add to List"/> </li>
        </CardActions>
        <CardText className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  },
});
