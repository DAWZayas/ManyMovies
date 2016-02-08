import React, { Component, PropTypes } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;
    return (
      <Card style={Object.assign({margin: '1em 0 0 0'}, style)}>
        <CardText style={{textAlign: 'center', margin: '1em 0 0 0'}}>
          <CircularProgress color={Colors.deepOrangeA200} mode="indeterminate" size={2}/>
        </CardText>
      </Card>
    );
  }
}

Spinner.propTypes = {
  style: PropTypes.object
};
