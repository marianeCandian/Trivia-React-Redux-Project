import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

const minAssert = 3;

class Feedback extends React.Component {
  render() {
    const { assertion } = this.props;
    return (
      <div>
        <Header />
        <div>
          { assertion < minAssert ? (
            <p data-testid="feedback-text">Could be better...</p>)
            : <p data-testid="feedback-text">Well Done!</p> }
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  assertion: globalState.player.assertion,
});
export default connect(mapStateToProps)(Feedback);
