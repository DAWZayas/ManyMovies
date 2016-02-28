import React, { Component, PropTypes } from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import ImageWithPlaceholder from '../../Widgets/ImageWithPlaceholder';
import defaultPosterSrc from '../../../images/mm-poster.png';

const styles = {
  column: { width: '4em', padding: '0' },
  img: { width: '4em' },
  title: { paddingLeft:'0.4em' }
};

export default class MovieRow extends Component {

  constructor(props) {
    super(props);
  }

  _handleTouchTap(slug){
    setTimeout(() => {
      this.props.navigate(`/movies/${slug}`);
    }, 200);
  }

  render() {
    const { movie } = this.props;
    return (
      <TableRow onTouchTap={this._handleTouchTap.bind(this, movie.ids.slug)}>
        <TableRowColumn style={styles.column}>
        {
          <ImageWithPlaceholder
            placeholderSrc={defaultPosterSrc}
            src={movie.images.poster}
            alt={movie.title}
            style={styles.img}
          />
        }
        </TableRowColumn>
        <TableRowColumn style={styles.title}>{movie.title}</TableRowColumn>
      </TableRow>
    );
  }
}

MovieRow.propTypes = {
  movie: PropTypes.object,
  navigate: PropTypes.func
};
