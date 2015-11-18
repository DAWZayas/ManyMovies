import React from 'react';
import Movies from './Movies';
const IconButton = require('material-ui/lib/icon-button');

export default React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    onClick: function() {
        this.setState({ showResults: true });
    },
    render: function() {
        return (
            <div>
                <IconButton tooltip="Search" onClick={this.onClick}>
                <i className="material-icons">search</i>
                  </IconButton>
                { this.state.showResults ? <Movies /> : null }
            </div>
        );
    }
});

