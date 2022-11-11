import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { timeAction } from '../redux/actions';

class Chronometer extends React.Component {
  componentDidUpdate() {
    const { time } = this.props;
    if (time > 0) {
      const { dispatch } = this.props;
      const seconds = 1000;
      setTimeout(() => {
        const newTime = (time - 1);
        dispatch(timeAction(newTime));
      }, seconds);
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <span>{time}</span>
      </div>
    );
  }
}

Chronometer.propTypes = {
  time: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.reduceTime.time,
});

export default connect(mapStateToProps)(Chronometer);
