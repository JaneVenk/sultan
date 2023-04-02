import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

interface Props {
  bascketCount: number;
}

const Header: React.FC<Props> = ({ bascketCount }) => {
  let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "0");

  return (
    <div>
      <div className="header-info">
        <div className="location-email">
          <img
            className="location-image"
            src="/images/header/locationIcon.svg"
          ></img>
          <div className="adress">
            <p className="adress-text">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
            <p className="adress-addition">(Рынок Восточный)</p>
          </div>
          <img className="line-image" src="/images/header/line.svg"></img>
          <img
            className="envelope-image"
            src="/images/header/envelopeIcon.svg"
          ></img>
          <div className="email">
            <p className="adress-text">opt.sultan@mail.ru</p>
            <p className="adress-addition">На связи в любое время</p>
          </div>
        </div>

        <div className="header-menu">
          <p className="header-menu-text">О компании</p>
          <img src="/images/header/line.svg"></img>
          <p className="header-menu-text">Доставка и оплата</p>
          <img src="/images/header/line.svg"></img>
          <p className="header-menu-text">Возврат</p>
          <img src="/images/header/line.svg"></img>
          <p className="header-menu-text">Контакты</p>
        </div>
      </div>

      <div className="line"></div>

      <div className="info">
        <div className="info-1">
          <img
            className="sultan-logo-image"
            src="/images/header/sultanLogo.svg"
          ></img>

          <div className="info-buttons">
            <button className="catalog">
              <div className="catalog-inner">
                <p className="catalog-text">Каталог</p>
                <img src="/images/header/catalogIcon.svg"></img>
              </div>
            </button>
            <input className="search" placeholder="Поиск..."></input>
            <img
              className="search-icon"
              src="/images/header/searchIcon.svg"
            ></img>
          </div>

          <div className="info-women">
            <div className="info-women-data">
              <p className="info-women-data-tel">+7 (777) 490-00-91</p>
              <p className="info-women-data-work-time">
                время работы: 9:00-20:00
              </p>
              <p className="info-women-data-order">Заказать звонок</p>
            </div>
            <img
              className="info-women-image"
              src="/images/header/women.svg"
            ></img>
          </div>
        </div>

        <img className="line-image" src="/images/header/line.svg"></img>

        <button className="button-price-list">
          <div className="button-price-list-inner">
            <p className="price-list-text">Прайс-лист</p>
            <img src="/images/header/downloadIcon.svg"></img>
          </div>
        </button>

        <img className="line-image" src="/images/header/line.svg"></img>

        <div className="bascket">
          <Link to="/bascket">
            <img
              className="bascket-icon"
              src="/images/header/bascketIcon.svg"
            ></img>
          </Link>

          <div className="bascket-text">
            <p className="bascket-text-name">Корзина</p>
            <p className="bascket-text-price">{t} ₸</p>
          </div>

          <div className="count">
            <p>{bascketCount}</p>
          </div>
        </div>
      </div>

      <div className="line2"></div>
    </div>
  );
};

export default Header;
