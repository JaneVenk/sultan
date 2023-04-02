import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/productCard.css";

interface Props {
  imageUrl: string;
  iconUrl: string;
  amount: string;
  brand: string;
  name: string;
  code: number;
  manufacturer: string;
  price: number;
  typeOfCare: string;
  setBascketCount(): void;
  id: string;
  deleteProduct(id: string): void;
  updateProduct(updatedProduct: any): void;
}

const ProductCard: React.FC<Props> = (Props) => {
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);

  const [updateProductInfo, setUpdateProductInfo] = useState({
    imageUrl: Props.imageUrl,
    iconUrl: Props.iconUrl,
    amount: Props.amount,
    brand: Props.brand,
    name: Props.name,
    code: Props.code,
    manufacturer: Props.manufacturer,
    price: Props.price,
    typeOfCare: Props.typeOfCare,
  });

  function toBascketClick(event: any) {
    event.preventDefault();
    Props.setBascketCount();

    var bascketCountLocal = JSON.parse(
      localStorage.getItem("bascketCount") || ""
    );

    bascketCountLocal = bascketCountLocal + 1;

    localStorage.setItem("bascketCount", JSON.stringify(bascketCountLocal));

    var purchases = JSON.parse(localStorage.getItem("purchases") || "");

    purchases.push(Props.name);

    localStorage.setItem("purchases", JSON.stringify(purchases));

    let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "");

    const pr = +Props.price;

    t = t + pr;

    localStorage.setItem("totalProductsPrice", JSON.stringify(t));
  }

  const str = `/page/${Props.name}`;

  function deleteButtonClick() {
    Props.deleteProduct(Props.id);
  }

  function updateButtonClick() {
    setShowUpdateMenu(true);
  }

  function handleUpdateProductInfo(event: any) {
    event.preventDefault();

    const { name, value } = event.target;

    setUpdateProductInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function updateProductInfoClick() {
    const fullUpdatedProductInfo = { ...updateProductInfo, key: Props.id };

    Props.updateProduct(fullUpdatedProductInfo);

    setShowUpdateMenu(false);
  }

  return (
    <div className="product-card">
      {showUpdateMenu ? (
        <div>
          <div className="form-add-product">
            <label>URL картинки:</label>
            <input
              type="text"
              name="imageUrl"
              value={updateProductInfo.imageUrl}
            ></input>

            <label>URL иконки:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="iconUrl"
              value={updateProductInfo.iconUrl}
            ></input>

            <label>Оъем / Вес:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="amount"
              value={updateProductInfo.amount}
            ></input>

            <label>Бренд:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="brand"
              value={updateProductInfo.brand}
            ></input>

            <label>Название:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="name"
              value={updateProductInfo.name}
            ></input>

            <label>Штрихкод:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="number"
              name="code"
              value={updateProductInfo.code}
            ></input>

            <label>Производитель:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="manufacturer"
              value={updateProductInfo.manufacturer}
            ></input>

            <label>Цена:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="number"
              name="price"
              value={updateProductInfo.price}
            ></input>

            <label>Тип ухода:</label>
            <input
              onChange={handleUpdateProductInfo}
              type="text"
              name="typeOfCare"
              value={updateProductInfo.typeOfCare}
            ></input>

            <button onClick={updateProductInfoClick}>Изменить</button>
            <button
              onClick={() => {
                setShowUpdateMenu(false);
              }}
            >
              Отменить
            </button>
          </div>{" "}
        </div>
      ) : (
        <div>
          <Link to={str}>
            <div className="product-image">
              <a href="...">
                <img className="product-img" src={Props.imageUrl}></img>
              </a>
            </div>
          </Link>

          <div className="product-amount">
            <img src={Props.iconUrl}></img>
            <p className="product-amount-text">{Props.amount}</p>
          </div>

          <p className="product-name">
            <span>{Props.brand}</span> {Props.name}
          </p>

          <button className="delete-product-card" onClick={deleteButtonClick}>
            <img src="/images/bascketPage/del.png"></img>
          </button>
          <button className="update-product-card" onClick={updateButtonClick}>
            <img src="/images/bascketPage/pen.png"></img>
          </button>

          <div className="product-info">
            <p className="product-info-key">
              Штрихкод: <span>{Props.code}</span>
            </p>
            <p className="product-info-key">
              Производитель: <span>{Props.manufacturer}</span>
            </p>
            <p className="product-info-key">
              Бренд: <span>{Props.brand}</span>
            </p>
          </div>

          <div className="bottom-part">
            <p className="bottom-part-price">{Props.price} ₸</p>
            <button onClick={toBascketClick} className="bottom-part-button">
              <div className="bottom-part-button-inner">
                <p>В КОРЗИНУ</p>
                <img src="/images/catalogPage/productBasket.svg"></img>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
