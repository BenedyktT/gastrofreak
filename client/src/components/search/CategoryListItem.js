import React from "react";
import { Link } from "react-router-dom";

const CategoryListItem = ({ thumb, title, id }) => {
  return (
    <li>
      <Link className="category__item" to={`/meal/${id}`}>
        <div
          className="category__item-bg"
          style={{
            backgroundImage: `url(${thumb})`
          }}
        ></div>
        <div className="category__item-overlay"></div>
        <h3 className="category__item-title">{title}</h3>
      </Link>
    </li>
  );
};

export default CategoryListItem;
