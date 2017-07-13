import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYPED_CORRECTLY, TYPED_INCORRECTLY, UNEVALUATED } from '../../../services/word_status';

class Statistics extends Component {

    componentDidMount() {
    }

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
        let { elapsedTime, applicationStarted } = this.props.appState;
        if (!applicationStarted) {
            return 60;
        } else {
            return 60 - elapsedTime;
        }
    }

    renderWPM() {
        let { elapsedTime, applicationStarted } = this.props.appState;
        if (elapsedTime <= 0 || !applicationStarted) {
            return '---';
        }
        return Math.floor(this.cpm / 5).toString();
    }

    renderCPM() {
        let { elapsedTime, applicationStarted, words } = this.props.appState;
        let chars = 0;

        if (elapsedTime <= 0 || !applicationStarted) {
            return '---';
        }

        words.every((elem, idx) => {
            if (elem.status === UNEVALUATED) {
                return false;
            }
            if (elem.status === TYPED_CORRECTLY) {
                chars+= elem.text.length
            }
            return true;
        });
        this.cpm = Math.floor(chars * (60/elapsedTime));
        return this.cpm.toString();
    }

};

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(Statistics);