import React, { Component } from 'react';
import Color from 'material-ui/lib/styles/colors';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class MoviesListHeader extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn colSpan="2" style={{textAlign: "center", color: Color.deepOrange800, fontSize: "1.3em"}}>
            Movies
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }
}

MoviesListHeader.propTypes = {
};

MoviesListHeader.defaultProps = {
};
