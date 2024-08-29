import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class SongCreate extends Component {
    constructor() {
        super();
        this.state = { title: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        const { title } = this.state;

        console.log(this.props);
        this.props
            .mutate({
                variables: {
                    title,
                },
            })
            .then((res) => {
                hashHistory.push('/');
            })
            .catch((erorr) => console.log(erorr));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input
                        onChange={(e) =>
                            this.setState({ title: e.target.value })
                        }
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);
