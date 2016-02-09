import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

export default class Friends extends Component {

  constructor(props) {
    super(props);
  }

  handleViewProfile(){
    this.props.viewProfile();
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 400,
        overflowY: 'auto',
        margin: 24,
      },
    };

    const tilesData = [
      {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Arrow'
      },
      {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Madison queen pega'
      },
      {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Queen'
      },
      {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Owli'
      },
      {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Ashley'
      },
      {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Alicia'
      }
    ];

    return(
      <div style={styles.root}>
        <GridList
          cellHeight={150}
          style={styles.gridList}
        >
          {tilesData.map(tile => (
            <GridTile
              key={tile.img}
              title={tile.title}
              actionIcon={<IconButton><i className="material-icons">remove_circle_outline</i></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Friends.propTypes = {
  viewProfile: PropTypes.func
};
/*
firebase.child(users).on....

friends/userId/objeto cn sus amigos
*/
