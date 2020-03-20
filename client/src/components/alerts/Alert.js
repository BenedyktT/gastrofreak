import { connect } from "react-redux";

import React from "react";

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`container alert`}>
        <div className={`alert-${alert.type}`}>{alert.msg}</div>
      </div>
    ))
  );
};

export default connect(state => ({
  alerts: state.alertReducer
}))(Alert);
