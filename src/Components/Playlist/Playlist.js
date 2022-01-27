import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        this.props.onNameChange(e.target.value);
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div className="Playlist">
            <input placeholder="playlist name..." 
                value={this.props.name} 
                onChange={this.handleKeyPress}/>
                <TrackList tracks={this.props.tracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
                />
                <button onClick={this.props.onSave} disabled={!this.state.value || !this.props.tracks.length} data-hover-disabled={!this.state.value ? "Playlist name is missing" : !this.props.tracks.length ? "No tracks are chosen" : null} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;