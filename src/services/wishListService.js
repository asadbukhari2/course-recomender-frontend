import Axios from "../axios-request";
import { authHeader } from "./authHeader";

export const FetchWishList = () => {
  // const user = JSON.parse(localStorage.getItem('user'))
  // const jwtToken = 'JWT ' + user.token

  return (
    Axios.get("wishlist", authHeader())
      // return Axios.get('wishlist', {headers: {authorization: jwtToken}})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      })
  );
};

export const PostWishList = (data) => {
  return Axios.post("wishlist", data, authHeader())
    .then((response) => {
      console.log("response in WishList Serivce is : ", response);
      return response.data;
    })
    .catch((error) => {
      console.log("error in WishList Serivce is : ", error);
      return error;
    });
};

export const PutWishList = (data) => {
  return Axios.put("wishlist/" + data.id, data, authHeader())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const DeleteWishList = (data) => {
  return Axios.delete("wishlist/" + data.id, authHeader())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
