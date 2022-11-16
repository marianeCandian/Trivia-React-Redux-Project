import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

const minAssert = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <div>
          { assertions < minAssert ? (
            <p data-testid="feedback-text">Could be better...</p>)
            : <p data-testid="feedback-text">Well Done!</p> }
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});
export default connect(mapStateToProps)(Feedback);
