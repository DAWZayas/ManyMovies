import React from 'react';
let SearchInput = require('react-search-input');
export default React.createClass({
  render() {
    let movies = [
    {
      movie: {
        title: 'Harry Potter 1'
      },
    },
    {
      movie: {
        title: 'Harry Potter 2'
      },
    },
    {
      movie: {
        title: 'Hachiko'
      },
    },
    {
      movie: {
        title: 'Iron Man'
      },
    }
    ];
    if (this.refs.search) {
      let filters = ["movie.title"];
      movies = movies.filter(this.refs.search.filter(filters));
    }
    return (
      <div>
        <SearchInput ref="search" onChange={this.searchUpdated} />
        {movies.map(function(film) {
          return (
            <div classtitle="film">
              {film.movie.title}
            </div>
          );
        })
        }
      </div>
    );
  },
  searchUpdated(term) {
    this.setState({searchTerm: term}); // needed to force re-render
  }
});
