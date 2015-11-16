import React from 'react';
import AddTo from './AddTo.js';

const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

export default React.createClass({
  render() {
    return (
      <Card>
        <div>
        <CardMedia className="film-cover" overlay={
           <CardTitle title="Minions" />  }>
          <img src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
        </CardMedia>
             <CardMedia className="film-cover" upperlay={
              <CardTitle/> }>
             <li className="post-icon">
             <AddTo />
            </li>
            </CardMedia>
        </div>
      }
      <CardText className="card-text">
        Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
        </CardText>
      </Card>
    );
  },
});
