import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addLikeToLyric } from '../../queries';

class LyricList extends Component {
    onLike(id) {
        const { mutate } = this.props;

        mutate({
            variables: {
                id,
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
                                <div>
                                    <i
                                        onClick={() =>
                                            this.onLike(id)
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
