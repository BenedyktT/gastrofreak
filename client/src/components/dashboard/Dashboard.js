import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";

const Dashboard = ({ isAuthenticated, loadUser }) => {
	useEffect(() => {
		isAuthenticated && loadUser();
	}, [isAuthenticated]);
	return <div>ss</div>;
};

export default connect(
	state => ({ isAuthenticated: state.authReducer.isAuthenticated }),
	{ loadUser }
)(Dashboard);
