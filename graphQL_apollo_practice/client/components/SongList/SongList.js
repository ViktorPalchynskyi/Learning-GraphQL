import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
    constructor() {
        super();
        this.state = {};
        // this.props;
    }

    renderSongs() {
        return this.props.data.songs.map(({ title, id }) => (
            <li key={id}>{title}</li>
        ));
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading</p>;
        }

        return <div>{this.renderSongs()}</div>;
    }
}

const query = gql`
    {
        songs {
            title
            id
        }
    }
`;

export default graphql(query)(SongList);
