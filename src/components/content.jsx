import PropTypes from 'prop-types';
import React from 'react';
import { fetchQuiz } from '../services/api';
import Loading from './loading';
import './button.css';

const FINAL_TIME = '30000';
const ERROR_NUMBER = 3;
class ContentGames extends React.Component {
  state = {
    count: 30,
    btnDisable: false,
    loading: true,
    results: [],
    nextQuestion: 0,
    response: false,
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
    this.initiTimer();
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

  initiTimer = () => {
    const { count } = this.state;
    if (count > 0) {
      const seconds = 1000;
      const timerDecrement = setInterval(() => {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }, seconds);
      setTimeout(() => {
        clearInterval(timerDecrement);
        this.setState({
          btnDisable: true,
        });
      }, FINAL_TIME);
    }
  };

  render() {
    const { results, loading, nextQuestion, response,
      btnDisable, count, questionArr } = this.state;
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
              {questionArr.map((element, index) => {
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
                    disabled={ btnDisable }
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
            <span>{count}</span>
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
