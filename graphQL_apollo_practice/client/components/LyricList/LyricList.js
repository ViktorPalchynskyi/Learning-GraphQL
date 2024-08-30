import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addLikeToLyric } from '../../queries';

class LyricList extends Component {
    onLike(id, likes) {
        const { mutate } = this.props;

        mutate({
            variables: {
                id,
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1,
                },
            },
        });
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {this.props.lyrics.map(
                        ({ content, id, likes }) => (
                            <li key={id} className="collection-item">
                                {content}
                                <div className="vote-box">
                                    <i
                                        onClick={() =>
                                            this.onLike(id, likes)
                                        }
                                        className="material-icons"
                                    >
                                        thumb_up
                                    </i>
                                    {likes}
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}

export default graphql(addLikeToLyric)(LyricList);
