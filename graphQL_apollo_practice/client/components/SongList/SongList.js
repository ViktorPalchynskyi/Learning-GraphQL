import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
    constructor() {
        super();
        this.state = {};
        // this.props;
    }

    renderSongs() {
        return this.props.data.songs.map(({ title, id }) => (
            <li className="collection-item" key={id}>
                {title}
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
                   <i className='material-icons'>add</i>
                </Link>
            </div>
        );
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
