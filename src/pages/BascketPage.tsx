import React, { useState } from "react";
import Header from "../components/Header";
import BascketProduct from "../components/BascketProduct";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import "../styles/bascketPage.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

interface Props {
  headerBascketCount: number;
}

const BascketPage: React.FC<Props> = ({ headerBascketCount }) => {
  const b = JSON.parse(localStorage.getItem("bascketCount") || "0");

  headerBascketCount = b;

  const { isOpen, toggle } = useModal();

  const [bc, setBc] = useState(headerBascketCount);

  const purchases = JSON.parse(localStorage.getItem("purchases") || "");

  type tplotOptions = {
    [key: string]: number;
  };

  const elementCounts: tplotOptions = {};

  purchases.forEach((element: any) => {
    elementCounts[element] = (elementCounts[element] || 0) + 1;
  });

  const products = JSON.parse(localStorage.getItem("products") || "");

  const basketProductsToShow: any[] = [];

  Object.entries(elementCounts).map((e) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === e[0]) {
        const product = { ...products[i], backetCountProduct: e[1] };

        basketProductsToShow.push(product);

        break;
      }
    }
  });

  const [bascetProductList, setBasketProductList] =
    useState(basketProductsToShow);

  let totalProductsPrice = 0;

  for (let i = 0; i < bascetProductList.length; i++) {
    totalProductsPrice =
      totalProductsPrice +
      +bascetProductList[i].price * bascetProductList[i].backetCountProduct;
  }

  const [tPrice, setTPrice] = useState(totalProductsPrice);

  localStorage.setItem("totalProductsPrice", JSON.stringify(tPrice));

  function changeTotalPrice(newTotalPrice: number) {
    setTPrice((prev: any) => {
      return newTotalPrice;
    });
  }

  function deleteProduct(key: string) {
    setBasketProductList((prev) => {
      return prev.filter((product: any) => {
        return product.key !== key;
      });
    });
  }

  function changeBascketCount(count: number) {
    localStorage.setItem("bascketCount", JSON.stringify(count));

    setBc((prev: any) => {
      return count;
    });
  }

  return (
    <div>
      <Header bascketCount={bc} />

      <div className="backet-bp">
        <div className="current-page-bp">
          <Link to={"/"}>
            <p className="current-title-bp">Главная</p>
          </Link>
          <img src="/images/catalogPage/line.svg"></img>
          <p className="next-page-bp">Корзина</p>
        </div>

        <h1 className="title-bp">КОРЗИНА</h1>

        <img className="hor-line-bp" src="/images/bascketPage/line.svg"></img>

        {bascetProductList.length === 0 ? (
          <div className="empty-bascket">Корзина пуста</div>
        ) : (
          bascetProductList.map((product: any) => {
            return (
              <div>
                <BascketProduct
                  imageUrl={product.imageUrl}
                  iconUrl={product.iconUrl}
                  amount={product.amount}
                  brand={product.brand}
                  name={product.name}
                  price={product.price}
                  id={product.key}
                  key={product.key}
                  backetCountProduct={product.backetCountProduct}
                  deleteProduct={deleteProduct}
                  changeBascketCount={changeBascketCount}
                  changeTotalPrice={changeTotalPrice}
                />
                <img
                  className="hor-line-bp"
                  src="/images/bascketPage/line.svg"
                ></img>
              </div>
            );
          })
        )}

        <div className="bottom-bp">
          <button onClick={toggle} className="make-order">
            Оформить заказ
          </button>
          <p className="bottom-price-bp">{tPrice} ₸</p>
        </div>
      </div>

      <Modal isOpen={isOpen} toggle={toggle}>
        <div className="model-wrapper">
          <img src="/images/bascketPage/modal.svg"></img>
          <p className="modal-title">СПАСИБО ЗА ЗАКАЗ</p>
          <p className="modal-text">
            Наш менеджер свяжется с вами в ближайшее время
          </p>
        </div>
        <Link to={"/"}>
          <button className="modal-button" onClick={toggle}>
            <img src="/images/bascketPage/close.svg"></img>
          </button>
        </Link>
      </Modal>
      <Footer/>
    </div>
  );
};

export default BascketPage;
