import React, { PropTypes } from 'react';
import { values } from 'lodash';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import MovieRow from './MovieRow';
import MoviesListHeader from './MoviesListHeader';

const MoviesTable = props => (
  <Table
    fixedHeader
    selectable={false}
  >
    <MoviesListHeader/>
    <TableBody
      displayRowCheckbox={false}
      showRowHover
      stripedRows={false}
    >
      {
        values(props.movies).map((movie) => (
            <MovieRow key={movie.ids.trakt} navigate={props.navigate} movie={movie}/>
          )
        )
      }
    </TableBody>
  </Table>
);

MoviesTable.propTypes = {
  movies: PropTypes.object,
  navigate: PropTypes.func
};

export default MoviesTable;
