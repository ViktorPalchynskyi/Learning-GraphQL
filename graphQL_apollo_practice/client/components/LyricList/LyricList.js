import React, { Component } from 'react';

class LyricList extends Component {
    render() {
        return (
            <div>
                <ul className='collection'>
                    {this.props.lyrics.map(({ content, id }) => (
                        <li key={id} className='collection-item'>{content}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default LyricList;
