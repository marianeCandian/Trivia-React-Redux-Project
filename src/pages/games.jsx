import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/header';
import ContentGames from '../components/content';

class Games extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <ContentGames
          history={ history }
        />
      </div>
    );
  }
}

Games.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Games;
