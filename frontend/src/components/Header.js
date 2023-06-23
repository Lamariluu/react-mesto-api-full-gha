import React from "react";
import logo from "../images/logo-white.svg";

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="логотип сайта место россия"
        src={logo}
      />
      <div className="header__auth">
        <p>{props.mail}</p>
        <p onClick={props.onClick} className="link">{props.title}</p>
      </div>
    </header>
  );
}

export default Header;