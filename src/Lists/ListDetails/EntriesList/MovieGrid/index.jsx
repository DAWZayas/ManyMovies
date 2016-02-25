import React, { Component, PropTypes } from 'react';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import defaultPosterSrc from '../../../../../images/mm-poster.png';

export default class MovieGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {src: defaultPosterSrc};
    const img = new Image();
    img.onload = () => {
      this.setState({ src: img.src });
      img.onload = null;
    };
    img.src = this.props.movie.images.poster;
  }

  _handleRemoveTouchTap(e){
    const { movie, idList, removeEntry, handleSnackBarRequest, user } = this.props;
    const idMovie = movie.ids.trakt.toString();
    e.stopPropagation();
    removeEntry(idList, idMovie, user.userName);
    handleSnackBarRequest(idMovie);
  }

  render() {
    const { movie, navigate, owner } = this.props;
    const year = movie.released.split('-')[0];
    return (
      <GridTile
        title={movie.title}
        subtitle={year}
        onTouchTap={() => navigate(`/movies/${movie.ids.slug}`)}
        titleBackground="rgba(0, 0, 0, 0.60)"
        actionIcon={owner ?
          <IconButton
            iconStyle={{color: "white"}}
            iconClassName="material-icons"
            tooltipPosition="top-left"
            tooltip="Remove from list"
            onTouchTap={this._handleRemoveTouchTap.bind(this)}
          >highlight_off
          </IconButton> :
          null
        }
      >
        <img src={this.state.src} alt={movie.title}/>
      </GridTile>
    );
  }
}

MovieGrid.propTypes = {
  idList: PropTypes.string,
  movie: PropTypes.object,
  user: PropTypes.object,
  removeEntry: PropTypes.func,
  handleSnackBarRequest: PropTypes.func,
  navigate: PropTypes.func,
  owner: PropTypes.bool
};

MovieGrid.defaultProps = {
  movie: {}
};
