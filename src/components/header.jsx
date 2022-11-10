import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    email: '',
  };

  componentDidMount() {
    this.emailConvert();
  }

  emailConvert = () => {
    const { email } = this.props;
    const emailConvertido = md5(email).toString();
    console.log(emailConvertido);
    this.setState({
      email: emailConvertido,
    });
  };

  render() {
    const { email } = this.state;
    const { name } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="avatar"
          src={ `https://www.gravatar.com/avatar/${email}` }
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  name: globalState.user.name,
});

export default connect(mapStateToProps)(Header);
