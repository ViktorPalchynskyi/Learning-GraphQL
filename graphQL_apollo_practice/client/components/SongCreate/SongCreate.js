import React, { Component } from 'react';

class SongCreate extends Component {
    constructor() {
        super();
        this.state = { title: '' };
    }

    render() {
        return (
            <div>
                <h3>Create a new Song</h3>
                <form>
                    <lanel>Song Title:</lanel>
                    <input
                        onChange={(e) =>
                            this.setState(e.target.value)
                        }
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

export default SongCreate;
