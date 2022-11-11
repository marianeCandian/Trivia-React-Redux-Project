import PropTypes from 'prop-types';
import React from 'react';
import { fetchQuiz } from '../services/api';
import Loading from './loading';
import './button.css';

const ERROR_NUMBER = 3;
class ContentGames extends React.Component {
  state = {
    loading: true,
    results: [],
    nextQuestion: 0,
    response: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const dataQuiz = await fetchQuiz(token);
    console.log(dataQuiz);
    if (dataQuiz.response_code === ERROR_NUMBER) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      results: dataQuiz.results,
      loading: false,
    });
  }

  questionRandom = (results) => {
    const correctAnswer = results[0].correct_answer;
    const incorrectAnswers = results[0].incorrect_answers;
    const optionList = [correctAnswer, ...incorrectAnswers];
    const randomDivision = 0.5;
    const shuffledAlternatives = optionList
      .sort(() => Math.random() - randomDivision);
    console.log(shuffledAlternatives);
    return [...shuffledAlternatives];
  };

  render() {
    const { results, loading, nextQuestion, response } = this.state;
    const negative = -1;
    let index2 = negative;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <h3>Categoria</h3>
            <p data-testid="question-category">
              {results[nextQuestion].category}
            </p>
            <h3>Pergunta</h3>
            <p data-testid="question-text">
              {results[nextQuestion].question}
            </p>
            <div data-testid="answer-options">
              {this.questionRandom(results).map((element, index) => {
                let classCss = '';
                if (response) {
                  classCss = element === results[nextQuestion].correct_answer
                    ? 'correctAnswer' : 'incorrectAnswer';
                }
                index2 += element === results[nextQuestion].correct_answer ? 0 : 1;
                return (
                  <button
                    type="button"
                    data-testid={ element === results[nextQuestion].correct_answer
                      ? 'correct-answer' : `wrong-answer-${index2}` }
                    key={ index }
                    className={ classCss }
                    onClick={
                      () => this.setState({
                        response: true,
                      })
                    }
                  >
                    {element}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

ContentGames.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ContentGames;
