import React, { Component } from 'react';
import { connect } from 'react-redux';

class Statistics extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="stats-container">
                <div className="wpm-container">
                    <span>WPM</span>
                    <span>---</span>
                </div>
                <div className="countdown-container">
                    {this.renderCountdown()}
                </div>
                <div className="cpm-container">
                    <span>CPM</span>
                    <span>---</span>
                </div>
            </div>
        );
    }

    renderCountdown() {
        let { elapsedTime, applicationStarted } = this.props.appState;
        if (!applicationStarted) {
            return 60;
        } else {
            return 60 - elapsedTime;
        }
    }

};

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(Statistics);