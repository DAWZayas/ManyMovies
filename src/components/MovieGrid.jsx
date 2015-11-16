import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import defaultPosterSrc from '../../images/mm-poster.png';
injectTapEventPlugin();

export default class MovieGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {src: defaultPosterSrc};
    const img = new Image();
    img.onload = () => { this.setState({ src: img.src });};
    img.src = this.props.movie.images.poster;
  }

  render() {
    const { movie, navigate, idList, removeEntry } = this.props;
    const year = movie.released.split('-')[0];
    return (
      <GridTile
        title={movie.title}
        subtitle={year}
        onTouchTap={() => navigate('lists')}
        titleBackground="rgba(0, 0, 0, 0.60)"
        actionIcon={<IconButton
          iconStyle={{color: "white"}}
          iconClassName="material-icons"
          tooltipPosition="top-left"
          tooltip="Remove from list"
          onTouchTap={(e) => {
            e.stopPropagation();
            removeEntry(idList, movie.ids.trakt.toString());
          }
        }>highlight_off</IconButton>}>
        <img src={this.state.src} alt={movie.title}/>
      </GridTile>
    );
  }
}

MovieGrid.propTypes = {
  idList: PropTypes.string,
  movie: PropTypes.object,
  removeEntry: PropTypes.func,
  navigate: PropTypes.func
};

MovieGrid.defaultProps = {
  movie: {}
};
