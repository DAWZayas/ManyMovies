import React, { PropTypes } from 'react';
import Color from 'material-ui/lib/styles/colors';
import twitterImg from '../../images/twitter.png';
import { getDayHashtag } from '../utils';

const styles = {
  twitterContainer: { color: Color.white, backgroundColor: '#53d0e8', lineHeight: '2em', display: 'inline-block', padding: '0 0.5em 0 0' },
  twitterLink: { color: Color.white, textDecoration: 'none' },
  twitterImg: { height: '2em' }
};

const ShareIcon = (props) => (
  <div style={styles.twitterContainer}>
    <a
      style={styles.twitterLink}
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${props.text}&hashtags=${getDayHashtag()},ManyMovies&url=${encodeURIComponent(window.location.href)}`}>
      <img style={styles.twitterImg} src={twitterImg} alt="twitter-logo"/>
      Share
    </a>
  </div>);

ShareIcon.propTypes = {
  text: PropTypes.string
};

export default ShareIcon;
