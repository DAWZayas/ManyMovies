import React, { Component, PropTypes } from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import defaultPosterSrc from '../../images/mm-poster.png';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class MovieRow extends Component {

  constructor(props) {
    super(props);
  }

  _handleTouchTap(slug){
    this.props.navigate(`/movies/${slug}`);
  }

  render() {
    const { movie } = this.props;
    return (
      <TableRow onTouchTap={this._handleTouchTap.bind(this, movie.ids.slug)}>
        <TableRowColumn style={{width: "4em", padding: "0"}}>
        {
          <ImageWithPlaceholder
            placeholderSrc={defaultPosterSrc}
            src={movie.images.poster}
            alt={movie.title}
            style={{width: "4em"}}
          />
        }
        </TableRowColumn>
        <TableRowColumn style={{paddingLeft:"0.4em"}}>{movie.title}</TableRowColumn>
      </TableRow>
    );
  }
}

MovieRow.propTypes = {
  movie: PropTypes.object,
  navigate: PropTypes.func
};

MovieRow.defaultProps = {
  movie: {}
};
