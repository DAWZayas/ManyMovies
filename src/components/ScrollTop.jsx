import React, { Component /*, PropTypes */} from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Colors from 'material-ui/lib/styles/colors';
import ScrollToTop from 'react-scroll-up';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class ScrollTop extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollToTop showUnder={300}>
          <FloatingActionButton backgroundColor={Colors.orange600}>
            <FontIcon className="material-icons">arrow_upward</FontIcon>
          </FloatingActionButton>
        </ScrollToTop>
    );
  }
}

ScrollTop.propTypes = {

};

ScrollTop.defaultProps = {

};
