import React, { Component /*, PropTypes */} from 'react';
import Colors from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{margin: '1em 0 0 0'}}>
        <CardText style={{textAlign: 'center', margin: '1em 0 0 0'}}>
          <CircularProgress color={Colors.deepOrangeA200} mode="indeterminate" size={2}/>
        </CardText>
      </Card>
    );
  }
}
