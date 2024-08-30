import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSong, deleteSong } from '../../queries';

class SongList extends Component {
    constructor() {
        super();
        this.state = {};
        // this.props;
    }

    onSongDelete(id) {
        console.log(id, this.props);
        this.props.mutate({
            variables: {
                id,
            },
        })
        .then(() => this.props.data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(({ title, id }) => (
            <li className="collection-item" key={id}>
                {title}
                <i
                    className="material-icons"
                    onClick={this.onSongDelete.bind(this, id)}
                >
                    delete
                </i>
            </li>
        ));
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading</p>;
        }

        return (
            <div>
                <ul className="collection">{this.renderSongs()}</ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export default graphql(deleteSong)(graphql(fetchSong)(SongList));
