import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addLyricToSong } from '../../queries';
import { fetchSongById } from '../../queries/fetchSongById';

class LyricCreate extends Component {
    constructor() {
        super();

        this.state = { content: '' };
    }

    onSubmit(e) {
        e.preventDefault();
        const { content } = this.state;
        const { mutate, songId } = this.props;

        mutate({
            variables: {
                content,
                songId,
            },
        }).then(() => {});

        this.setState({ content: '' })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    onChange={(e) =>
                        this.setState({ content: e.target.value })
                    }
                    value={this.state.content}
                />
            </form>
        );
    }
}

export default graphql(addLyricToSong)(LyricCreate);
