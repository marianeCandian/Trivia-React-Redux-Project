import PropTypes from 'prop-types';
import React from 'react';
import { fetchQuiz } from '../services/api';
import Loading from './loading';

const ERROR_NUMBER = 3;
class ContentGames extends React.Component {
  state = {
    loading: true,
    results: [],
    nextQuestion: 0,
    questionArr: [],
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
      questionArr: this.questionRandom(dataQuiz.results),
      loading: false,
    });
  }

  questionRandom = (results) => {
    const correctAnswer = results[0].correct_answer;
    const incorrectAnswers = results[0].incorrect_answers;
    const optionList = incorrectAnswers;
    optionList
      .splice(Math.floor(Math.random()
      * (incorrectAnswers.length + 1)), 0, correctAnswer);
    return [...optionList];
  };

  render() {
    const { results, loading, nextQuestion, questionArr } = this.state;
    const negative = -1;
    let index2 = negative;
    console.log(questionArr);
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
            <div>
              {questionArr.map((element, index) => {
                index2 += element === results[nextQuestion].correct_answer ? 0 : 1;
                return (
                  <button
                    type="button"
                    data-testid={ element === results[nextQuestion].correct_answer
                      ? 'correct-answer' : `wrong-answer-${index2}` }
                    key={ index }
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
