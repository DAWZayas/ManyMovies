import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import { formatDate } from '../utils/date';

export default class Comment extends Component {

  render() {
    const { time, text } = this.props.comment;
    const userAvatar = (
      <Avatar
        icon={
          <FontIcon
            className="material-icons">
              face
          </FontIcon>
        }
        color={Colors.orange100}
        backgroundColor={Colors.deepOrange900}
      />
    );

    return (
      <Card>
        <CardHeader
          title="You"
          titleColor={Colors.deepOrange900}
          titleStyle={{fontWeight: "bold"}}
          subtitle={formatDate(time)}
          avatar={userAvatar}
        />
        <CardText>
          {text}
        </CardText>
        <CardActions style={{float: "right"}}>
          <IconButton
            iconClassName="material-icons"
           iconStyle={{color:Colors.grey400}}
            tooltipPosition="top-left"
            tooltip="Edit">
            edit
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.red900}}
            tooltipPosition="top-left"
            tooltip="Delete">
            clear
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Comment.propTypes = {
  commented: PropTypes.string,
  comment: PropTypes.object
};

Comment.defaultProps = {
  comment:{
    text: 'This movie is awesome',
    time: new Date()
  }
};
