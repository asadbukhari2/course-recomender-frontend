import React, { useEffect, useState } from "react";

import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useStore } from "../../../hooks-store/store";
import classes from "./Cart.module.css";
import BagSVG from "../../../hoc/SVGIcons/BagSVG";
import Button from "../Button/Button";
import MyCart from "../../../containers/MyCart/MyCart";
import { getCurrentUser } from "../../../services/authService";

function Cart() {
  const [view, setView] = useState(false);
  const [isDropView, setIsDropView] = useState(false);
  const navigate = useHistory();

  const state = useStore()[0];
  const dispatch = useStore()[1];

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser.token) {
      setIsDropView(true);
    } else {
      setIsDropView(false);
    }
  }, [currentUser]);

  const cartItems = state.cart.items;

  const toggleDetailViewHandler = () => {
    setView(!view);
  };

  let items,
    totalPrice = 0;

  if (cartItems) {
    items = cartItems.length;
    cartItems.map((cartItem) => {
      return (totalPrice += parseInt(cartItem.total_price));
    });
  } else {
    items = 0;
    totalPrice = 0;
  }

  const oncheckout = () => {
    navigate.push("/dashboard");
  };

  return (
    <ul className={classes.NavIcons}>
      <li>
        <button className={classes.Cart} type={"submit"}>
          {/* <a href="#" title="button" onClick={event => event.preventDefault()}> */}
          <div className={classes.SvgBag} onClick={toggleDetailViewHandler}>
            <BagSVG
              name={"bag"}
              fill={"#bdc3c7"}
              width={50}
              className={classes.BagSVG}
            />
            <div className={classes.SvgBagItems}>{state.cart.items.length}</div>
          </div>
          {/* </a> */}
        </button>
      </li>
      {isDropView === true ? (
        <div className={classes.DropDownCart}>
          <div
            className={
              window.innerWidth >= 500
                ? classes.DropDownCartDetail
                : classes.DropDownCartDetailV2
            }
          >
            <div className={classes.DropDownCartDetailItems}>
              <MyCart styleFor={"hover"} />
            </div>
            <div
              className={
                state.cart.items.length > 0
                  ? classes.DropDownButtons
                  : classes.NoneDisplay
              }
            >
              <div>
                <NavLink to={"/cart"}>
                  <Button>View Cart</Button>
                </NavLink>
              </div>
              {state.cart.items.length > 0 ? (
                <div>
                  <Button onclick={oncheckout}>Check Out</Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {window.innerWidth > 500 ? (
        <li className={classes.Cart}>
          <NavLink to={"/cart"}>
            <div className={classes.CartDescription}>
              <p className={classes.cart}>Cart</p>
              <p className={classes.Text}>
                <span className={classes.Price}>{items}&nbsp;</span>
                items
                <br />
                <span className={classes.Price}>Rs:{totalPrice}</span>
              </p>
            </div>
          </NavLink>
        </li>
      ) : null}
    </ul>
  );
}

export default React.memo(Cart);
