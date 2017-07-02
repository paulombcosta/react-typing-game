import React, { Component } from 'react';
import { connect } from 'react-redux';

class TypingBox extends Component {

    render() {
        return(
            <div className="typing">
                {this.renderWords()}
            </div>
        )
    }

    renderWords() {
        return this.props.words.map((word) => {
            return (
                <span className="word">{word}</span>
            );
        });
    }
}

function mapStateToProps(state) {
    return {
        words: state.words
    };
}

export default connect(mapStateToProps, null)(TypingBox);