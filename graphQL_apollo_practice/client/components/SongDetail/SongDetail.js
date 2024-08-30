import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { fetchSongById } from '../../queries/fetchSongById';

class SongDetail extends Component {
    renderSong() {
        const { title } = this.props.data.song;

        return <h3>{title}</h3>;
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading...</p>;
        }
        console.log(this.props);

        return <div>{this.renderSong()}</div>;
    }
}

export default graphql(fetchSongById, {
    options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
