import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

const minAssert = 3;

class Feedback extends React.Component {
  render() {
    const { assertion, score, history } = this.props;
    return (
      <div>
        <Header />
        <div>
          { assertion < minAssert ? (
            <p data-testid="feedback-text">Could be better...</p>)
            : <p data-testid="feedback-text">Well Done!</p> }
        </div>
        <div>
          <h3>Seu desempenho</h3>
          <span
            data-testid="feedback-total-score"
          >
            {score}
          </span>
          <span
            data-testid="feedback-total-question"
          >
            {assertion}
          </span>

        </div>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  assertion: globalState.player.assertion,
  score: globalState.player.score,
});
export default connect(mapStateToProps)(Feedback);
