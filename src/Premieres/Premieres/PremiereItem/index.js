import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import ImageWithPlaceholder from '../../../Widgets/ImageWithPlaceholder';
import Colors from 'material-ui/lib/styles/colors';
import defaultPosterSrc from '../../../../images/mm-poster.png';

export default class Premieres extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleTouchTap(){
    const { premiere, navigate } = this.props;
    const { slug } = premiere.ids;
    setTimeout(() => {
      navigate(`/movies/${slug}`);
    }, 200);
  }

  render() {
    const { premiere } = this.props;
    const releaseDate = new Date(Date.parse(premiere.released));
    const formatedReleased = releaseDate.toLocaleDateString('en-GB').replace(/\//g, '-');
    return (
      <Card onTouchTap={() => {this._handleTouchTap();}} style={{margin: '1em'}}>
        <CardTitle
          title={premiere.title}
          subtitle={formatedReleased}
          titleColor={Colors.deepOrange900}
          />
        <CardText>
          <ImageWithPlaceholder
            placeholderSrc={defaultPosterSrc}
            src={premiere.images.poster}
            alt={premiere.title}
            style={{width: "4em", margin: "0 1em 1em 0", float: "left"}}
          />
          {premiere.sinopsis}
        </CardText>
      </Card>
    );
  }
}

Premieres.propTypes = {
  premiere: PropTypes.object,
  navigate: PropTypes.func
};

Premieres.defaultProps = {

};
