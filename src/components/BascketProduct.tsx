import React, { useState } from "react";
import "../styles/bascketProduct.css";

interface Props {
  imageUrl: string;
  iconUrl: string;
  amount: string;
  brand: string;
  name: string;
  price: number;
  id: string;
  backetCountProduct: number;
  deleteProduct(key: string): void;
  changeBascketCount(count: number): void;
  changeTotalPrice(price: number): void;
}

const BascketProduct: React.FC<Props> = (Props) => {
  const [productCount, setProductCount] = useState(Props.backetCountProduct);

  const firstProductPrice = +Props.price;

  const productBascketPrice = Props.backetCountProduct * firstProductPrice;
  const [productPrice, setProductPrice] = useState(productBascketPrice);

  function increaseProductCount() {
    setProductCount((prev) => {
      const newCount = prev + 1;

      return newCount;
    });

    setProductPrice((prev) => {
      return prev + firstProductPrice;
    });

    var bascketCountLocal = JSON.parse(
      localStorage.getItem("bascketCount") || ""
    );

    bascketCountLocal = bascketCountLocal + 1;

    Props.changeBascketCount(bascketCountLocal);

    let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "");

    let newt = t + firstProductPrice;

    localStorage.setItem("totalProductsPrice", JSON.stringify(newt));

    Props.changeTotalPrice(newt);

    var purchases = JSON.parse(localStorage.getItem("purchases") || "");

    purchases.push(Props.name);

    localStorage.setItem("purchases", JSON.stringify(purchases));
  }

  function decreaseProductCount() {
    setProductCount((prev) => {
      const newCount = prev - 1;

      if (newCount <= 1) {
        return 1;
      }

      return newCount;
    });

    setProductPrice((prev) => {
      const newPrice = prev - firstProductPrice;

      if (newPrice <= 0) {
        return firstProductPrice;
      }

      return newPrice;
    });

    if (productCount > 1) {
      var bascketCountLocal = JSON.parse(
        localStorage.getItem("bascketCount") || ""
      );

      bascketCountLocal = bascketCountLocal - 1;

      if (bascketCountLocal > 0) {
        Props.changeBascketCount(bascketCountLocal);

        let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "");

        let newt = t - firstProductPrice;

        localStorage.setItem("totalProductsPrice", JSON.stringify(newt));

        Props.changeTotalPrice(newt);

        var purchases = JSON.parse(localStorage.getItem("purchases") || "");

        for (let i = 0; i < purchases.length; i++) {
          if (purchases[i] === Props.name) {
            purchases.splice(i, 1);
            localStorage.setItem("purchases", JSON.stringify(purchases));
            break;
          }
        }
      }
    }
  }

  function del() {
    const purchases = JSON.parse(localStorage.getItem("purchases") || "");

    const updatedPurchases = purchases.filter((p: any) => {
      return p !== Props.name;
    });

    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));

    var bascketCountLocal = JSON.parse(
      localStorage.getItem("bascketCount") || ""
    );

    const num =
      Props.backetCountProduct - (Props.backetCountProduct - productCount);

    bascketCountLocal = bascketCountLocal - num;

    let t = JSON.parse(localStorage.getItem("totalProductsPrice") || "");

    let newt = t - productPrice;

    if (bascketCountLocal >= 0) {
      Props.changeBascketCount(bascketCountLocal);

      localStorage.setItem("totalProductsPrice", JSON.stringify(newt));

      Props.changeTotalPrice(newt);
    } else {
      Props.changeBascketCount(0);

      localStorage.setItem("totalProductsPrice", JSON.stringify(0));

      Props.changeTotalPrice(0);
    }

    Props.deleteProduct(Props.id);
  }

  return (
    <div className="backet-product-c">
      <div className="product-image-info-c">
        <div className="product-image-c">
          <img src={Props.imageUrl}></img>
        </div>

        <div className="product-info-c">
          <div className="product-amount-c">
            <img src={Props.iconUrl}></img>
            <p className="product-amount-text-c">{Props.amount}</p>
          </div>

          {Props.name.length > 26 ? (
            <p className="product-info-title-c">
              {Props.brand} {Props.name.substring(0, 26)}...
            </p>
          ) : (
            <p className="product-info-title-c">
              {Props.brand} {Props.name}
            </p>
          )}

          <div className="product-info-text-c">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
              mattis vulputate feugiat massa vestibulum duis.
            </p>
          </div>
        </div>
      </div>

      <div className="digits-c">
        <img src="/sultan/images/bascketPage/vline.svg"></img>

        <div className="culc-c">
          <button onClick={decreaseProductCount}>-</button>
          <p className="count-culc-c">{productCount}</p>
          <button onClick={increaseProductCount}>+</button>
        </div>

        <img src="/sultan/images/bascketPage/vline.svg"></img>

        <p className="price-c">{productPrice} ₸</p>

        <img src="/sultan/images/bascketPage/vline.svg"></img>

        <button onClick={del} className="del-but-c">
          <img src="/sultan/images/bascketPage/deleteBascket.svg"></img>
        </button>
      </div>
    </div>
  );
};

export default BascketProduct;
