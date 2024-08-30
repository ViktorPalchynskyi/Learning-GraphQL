import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { fetchSongById } from '../../queries/fetchSongById';
import { Link } from 'react-router';
import LyricCreate from '../LyricCreate.js/LyricCreate';
import LyricList from '../LyricList/LyricList';

class SongDetail extends Component {
    render() {
        if (this.props.data.loading) {
            return <p>Loading...</p>;
        }

        const { title, lyrics } = this.props.data.song;
        console.log(lyrics);
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{title}</h3>
                <LyricList lyrics={lyrics}/>
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql(fetchSongById, {
    options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
