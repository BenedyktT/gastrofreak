import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../redux/actions/alerts";
import {
  getFavourite,
  getMyRecipes
} from "../../redux/actions/favouriteActions";
import { ReactComponent as Favourite } from "../../assets/favourite.svg";
import { ReactComponent as Rubbish } from "../../assets/rubbish.svg";

const AddFavourite = ({
  id,
  isFavourite,
  idType,
  setAlert,
  getFavourite,
  getMyRecipes
}) => {
  const addFavourite = async id => {
    try {
      await axios.post(`/favourite/${id}`);

      getFavourite();
      setAlert("Successfully added to favourites", "success");
    } catch (error) {
      setAlert("Couldn't add to favourite, please try refresh page", "danger");
    }
  };
  const removeFavourite = async id => {
    try {
      if (idType === "_id") {
        await axios.delete(`/userrecipes/${id}`);
        getMyRecipes();
        setAlert("Successfully deleted from my Recipes", "success");
      }
      if (idType === "recipeId") {
        await axios.delete(`/favourite/${id}`);
        getFavourite();
        setAlert("Successfully deleted from favourites", "success");
        return;
      }
    } catch (error) {
      setAlert("Couldn't delete, please try refresh page", "danger");
    }
  };

  return (
    <div className="category__item-button">
      {isFavourite ? (
        <button onClick={() => removeFavourite(id)}>
          <Rubbish className="favourite-svg" width="20px" />
        </button>
      ) : (
        <button onClick={() => addFavourite(id)}>
          <Favourite className="favourite-svg" />
        </button>
      )}
    </div>
  );
};

export default connect(
  state => ({
    favourite: state.favouriteReducer.favourite
  }),
  { setAlert, getFavourite, getMyRecipes }
)(AddFavourite);
