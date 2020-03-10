import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import { getFavourite } from "../../redux/actions/favouriteActions";

const Dashboard = ({ isAuthenticated, loadUser, getFavourite }) => {
	useEffect(() => {
		isAuthenticated && loadUser();
	}, [isAuthenticated]);
	useEffect(() => {
		getFavourite();
	}, []);
	return <div>CSFA</div>;
};

export default connect(
	state => ({ isAuthenticated: state.authReducer.isAuthenticated }),
	{ loadUser, getFavourite }
)(Dashboard);
