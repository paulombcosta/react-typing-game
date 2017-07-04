import React, { Component } from 'react';
import { connect } from 'react-redux';

class TypingBox extends Component {

    render() {
        console.log(this.props.appState);
        return(
            <div className="typing">
                {this.renderWords()}
            </div>
        )
    }

    renderWords() {
        return this.props.appState.words.map((word, index) => {
            return (
                <span key={index} className="word">{word}</span>
            );
        });
    }
}

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(TypingBox);