import React from "react";

const GoBack = props => {
	return (
		<button
			onClick={() => {
				props.history.goBack();
			}}
		>
			Back
		</button>
	);
};

export default GoBack;
