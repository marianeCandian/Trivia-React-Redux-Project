import PropTypes from 'prop-types';
import React from 'react';
import { fetchQuiz } from '../services/api';

const ERROR_NUMBER = 3;
class ContentGames extends React.Component {
  state = {
    resultData: [],
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
      resultData: dataQuiz.results,
    });
  }

  render() {
    const { resultData } = this.state;
    return (
      <div>
        {resultData.map((element, index) => (<p key={ index }>{element.category}</p>))}
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
