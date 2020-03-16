import React from "react";
import { Link } from "react-router-dom";
import search from "../../assets/search-recipe.svg";
import add from "../../assets/add-recipe.svg";

const Landing = () => {
	return (
		<div className="landing-container">
			<h1>Welcome to Gastrofreak</h1>
			<h3>What would you like to do?</h3>
			<div className="landing-wrapper">
				<Link to="/preview" className="cta">
					<img src={add} alt="Add new recipe" />
					<span className="cta__headline">I would like to add new recipy</span>
					<span className="cta__paragraph">
						Gastrofreak allows you to quickly add new recipes and calculate
						macroelements out of it!
					</span>
				</Link>
				<Link to="/search" className="cta">
					<img src={search} alt="Search for recipies" />
					<span className="cta__headline">
						I would like to search for existing recipy
					</span>
					<span className="cta__paragraph">
						You can find recipy in the database and save it on your account or
						even modify it!
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Landing;
