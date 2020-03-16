import React from "react";
import { ReactComponent as LoaderSvg } from "../../assets/loader.svg";
import classnames from "classnames";

const Loader = ({ className }) => {
	return (
		<div className={classnames("loader", { [className]: className })}>
			<LoaderSvg />
		</div>
	);
};

export default Loader;
