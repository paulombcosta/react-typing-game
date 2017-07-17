import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FINISHED } from '../../../services/application_status';
import { restart } from '../../../actions';


class Restart extends Component {
    render() {
        return this.renderRestartButton();
    }

    renderRestartButton() {
        if (this.props.applicationStatus === FINISHED) {
            return (
                <a onClick={() => this.props.restart()} className="restart material-icons">replay</a>
            );
        } else {
            return null;
        }
    }
};

function mapStateToProps(state) {
    return {
        applicationStatus: state.appState.applicationStatus
    };
}

export default connect(mapStateToProps, { restart })(Restart);