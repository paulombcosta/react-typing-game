import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYPED_CORRECTLY, TYPED_INCORRECTLY, UNEVALUATED } from '../../../services/word_status';
import { STARTED, NOT_STARTED, FINISHED } from '../../../services/application_status';

class Statistics extends Component {

    render() {
        return (
            <div className="stats-container">
                <div className="wpm-container">
                    <span>WPM</span>
                    <span>{this.renderWPM()}</span>
                </div>
                <div className="countdown-container">
                    {this.renderCountdown()}
                </div>
                <div className="cpm-container">
                    <span>CPM</span>
                    <span>{this.renderCPM()}</span>
                </div>
            </div>
        );
    }

    renderCountdown() {
        let { elapsedTime, applicationStatus } = this.props.appState;
        if (applicationStatus === STARTED) {
            return 60 - elapsedTime;
        } else {
            return 60;
        }
    }

    renderWPM() {
        let { elapsedTime, applicationStatus } = this.props.appState;
        if (applicationStatus === STARTED && elapsedTime > 0) {
            return Math.floor(this.cpm / 5).toString();
        } else {
            return "---";
        }
    }

    renderCPM() {
        let { elapsedTime, applicationStatus, words } = this.props.appState;
        let chars = 0;

        if (applicationStatus === STARTED && elapsedTime > 0) {
            words.every((elem, idx) => {
                if (elem.status === UNEVALUATED) {
                    return false;
                }
                if (elem.status === TYPED_CORRECTLY) {
                    chars += elem.text.length
                }
                return true;
            });
            this.cpm = Math.floor(chars * (60 / elapsedTime));
            return this.cpm.toString();
        } else {
            return "---"
        }
    }

};

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(Statistics);