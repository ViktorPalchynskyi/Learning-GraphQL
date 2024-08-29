import React, { Component } from 'react';
import gql from 'graphql-tag';

export default class SongList extends Component {
    render() {
        return <div>SongList</div>;
    }
}

const query = gql`
    {
        songs {
            title
        }
    }
`;
