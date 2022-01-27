import React from "react";
import './SearchBar.css';
import spotifyLogo from '../../images/spotify-logo.ico';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
        this.props.isFirstTyping(true);
    }

    render() {
        return (
            <div className="SearchBar"> 
            <h2>Search for your favorite songs on <span className="spotify"><img id="spotify_logo" alt="spotify logo" src={spotifyLogo}/> Spotify.</span> Start creating playlists.</h2>
            <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            <button disabled={!this.state.term} onClick={this.search} className="SearchButton" data-hover-disabled="Oops, search box is empty">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;