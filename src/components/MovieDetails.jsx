import React from 'react';
import { Link } from 'react-router';

const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

export default React.createClass({
  render() {
    return (
      <Card>
        <CardMedia className="film-cover" overlay={
           <CardTitle title="Minions" />  }>
          <img src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
        </CardMedia>
             <CardMedia className="film-cover" upperlay={
              <CardTitle/> }>
             <li className="post-icon">
             <button className="post-collections-icon"> <i className="material-icons">collections_bookmark</i> </button>
             <button className="post-history-icon"> <i className="material-icons">history</i> </button>
            <Link to="/lists"> <button className="post-list-icon"> <i className="material-icons">playlist_add</i>  </button></Link>
            </li>
            </CardMedia>
        <CardText className="card-text">
        Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
        </CardText>
      </Card>
    );
  },
});
