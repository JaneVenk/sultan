import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";

import "../styles/productPage.css";

interface Props {}

const ProductPage: React.FC<Props> = (Props) => {
  const headerBascketCount = JSON.parse(
    localStorage.getItem("bascketCount") || "0"
  );

  let { name } = useParams();

  var productsFromLocalStorage = JSON.parse(
    localStorage.getItem("products") || ""
  );

  let currentProduct;

  for (let i = 0; i < productsFromLocalStorage.length; i++) {
    if (productsFromLocalStorage[i].name === name) {
      currentProduct = productsFromLocalStorage[i];
      break;
    }
  }

  const firstPrice = +currentProduct.price;

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(firstPrice);
  const [bascketCount, setBuscketCount] = useState(headerBascketCount);



  function increaseCount() {
    setCount((prev) => {
      return prev + 1;
    });

    setPrice((prev: any) => {
      return prev + firstPrice;
    });
  }

  function decreaseCount() {
    if (count <= 1) {
      return;
    }

    setCount((prev) => {
      return prev - 1;
    });

    setPrice((prev: any) => {
      return prev - firstPrice;
    });
  }

  function addToBascket() {
    setBuscketCount((prev: any) => {
      return prev + count;
    });

    let headerBascketCount = JSON.parse(
      localStorage.getItem("bascketCount") || "0"
    );

    headerBascketCount = headerBascketCount + count;

    localStorage.setItem("bascketCount", JSON.stringify(headerBascketCount));

    var purchases = JSON.parse(localStorage.getItem("purchases") || "");

    for (let i = 0; i < count; i++) {
      purchases.push(name);
    }

    localStorage.setItem("purchases", JSON.stringify(purchases));

    let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "");

    t = t + price;

    localStorage.setItem("totalProductsPrice", JSON.stringify(t));
  }

  return (
    <React.Fragment>
      <Header bascketCount={bascketCount} />

      <div className="current-page-pp">
        <Link to={"/"}>
          <p className="current-title-pp">Главная</p>
        </Link>
        <img src="/sultan/images/catalogPage/line.svg"></img>
        <p className="next-page-pp">Продукт</p>
      </div>

      <div className="main-block-pp">
        <div className="main-block-image-pp">
          <img src={currentProduct.imageUrl}></img>
        </div>
        <div className="main-block-info-pp">
          <p className="in-stock">В наличии</p>

          <p className="main-block-info-pp-title">
            <span>{currentProduct.brand}</span>&nbsp;
            {currentProduct.name}
          </p>

          <div className="main-block-info-pp-amount">
            <img src={currentProduct.iconUrl}></img>
            <p>{currentProduct.amount}</p>
          </div>

          <div className="digits-pp">
            <p className="price-pp">{price} ₸</p>

            <div className="culc-pp">
              <button onClick={decreaseCount}>-</button>
              <p className="count-culc-pp">{count}</p>
              <button onClick={increaseCount}>+</button>
            </div>

            <button onClick={addToBascket} className="del-but-pp">
              <div className="del-but-inner">
                <p>В корзину</p>
                <img src="/sultan/images/catalogPage/productBasket.svg"></img>
              </div>
            </button>
          </div>

          <div className="main-block-info-pp-offers">
            <div className="main-block-info-pp-offers-icon">
              <img src="/sultan/images/productPage/icon.svg"></img>
            </div>

            <div className="main-block-info-pp-offers-text">
              <p>
                При покупке от <span>10 000 ₸</span> бесплатная доставка по
                Кокчетаву и области
              </p>
            </div>

            <div className="main-block-info-pp-offers-pricelist">
              <div className="main-block-info-pp-offers-pricelist-inner">
                <p>Прайс-лист</p>
                <img src="/sultan/images/productPage/downarrow.svg"></img>
              </div>
            </div>
          </div>

          <div className="main-block-info-pp-list">
            <p>
              Производитель: <span>{currentProduct.manufacturer}</span>
            </p>
            <p>
              Бренд: <span>{currentProduct.brand}</span>
            </p>
            <p>
              Артикул: <span>{currentProduct.code}</span>
            </p>
            <p>
              Штрихкод: <span>{currentProduct.code}</span>
            </p>
          </div>

          <div className="main-block-info-pp-description">
            <p className="main-block-info-pp-description-title">
              Описание <img src="/sultan/images/productPage/close.svg"></img>
            </p>
            <p className="main-block-info-pp-description-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
              mattis vulputate feugiat massa vestibulum duis. Faucibus
              consectetur aliquet sed pellentesque consequat consectetur congue
              mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim,
              malesuada.
            </p>
          </div>

          <img
            className="main-block-info-pp-horline"
            src="/sultan/images/productPage/horline.svg"
          ></img>

          <div className="main-block-info-pp-char">
            <p className="main-block-info-pp-description-title">
              Характеристики <img src="/sultan/images/productPage/close.svg"></img>
            </p>
            <div className="main-block-info-pp-char-items">
              <p>
                Название: <span>{currentProduct.name}</span>
              </p>
              <p>
                Тип ухода: <span>{currentProduct.typeOfCare}</span>
              </p>
              <p>
                Производитель: <span>{currentProduct.manufacturer}</span>
              </p>
              <p>
                Бренд: <span>{currentProduct.brand}</span>
              </p>
              <p>
                Артикул: <span>{currentProduct.code}</span>
              </p>
              <p>
                Штрихкод: <span>{currentProduct.code}</span>
              </p>
              <p>
                Вес: <span>{currentProduct.amount}</span>
              </p>
              <p>
                Объем: <span>{currentProduct.amount}</span>
              </p>
              <p>
                Кол-во в коробке: <span>{currentProduct.amount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default ProductPage;
