/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../styles/catalogPage.css";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

import DATA from "../DATA.json";
import { useState, useEffect, useRef } from "react";
import React from "react";

interface Props {
  headerBascketCount: number;
  setBascketCount(): void;
}

const CatalogPage: React.FC<Props> = ({
  setBascketCount,
  headerBascketCount,
}) => {
  const b = JSON.parse(localStorage.getItem("bascketCount") || "0");

  headerBascketCount = b;

  const pr = localStorage.getItem("products") === null;

  if (pr) {
    const products = DATA.products;

    localStorage.setItem("products", JSON.stringify(products));
  }

  var productsFromLocalStorage = JSON.parse(
    localStorage.getItem("products") || ""
  );

  const [showSort, setShowSort] = useState(false);
  const [sortName, setSortName] = useState("названию");
  const [sortderection, setSortDerection] = useState("возрастанию");
  const [productsState, setProductsState] = useState(productsFromLocalStorage);
  const [sortNameTitle, setSortNameTitle] = useState("Название");
  const [leftFilterButtonId, setLeftFilterButtonId] = useState("");

  const page1 = React.useRef<HTMLParagraphElement>(null);
  const page2 = React.useRef<HTMLParagraphElement>(null);
  const page3 = React.useRef<HTMLParagraphElement>(null);
  const page4 = React.useRef<HTMLParagraphElement>(null);
  const page5 = React.useRef<HTMLParagraphElement>(null);

  const [pageCount, setPageCount] = useState(1);

  const [addNewProduct, setAddNewProduct] = useState(false);

  const [newProductInfo, setNewProductInfo] = useState({
    imageUrl: "",
    iconUrl: "/images/catalogPage/bottleIcon.svg",
    amount: "",
    brand: "",
    name: "",
    code: 0,
    manufacturer: "",
    price: 0,
    typeOfCare: "",
  });

  function sortInCategoryCard(val: string) {


    var productsLocalStorage = JSON.parse(
      localStorage.getItem("products") || ""
    );

    const pnew = productsLocalStorage.filter(
      (element: { typeOfCare: string }) => {
        return element.typeOfCare === val;
      }
    );

    setProductsState((prevVal: any) => {
      return pnew;
    });
  }

  function downIconClick(event: any) {
    event.preventDefault();

    setShowSort((prevValue) => {
      return !prevValue;
    });
  }

  function formSubmit(event: any) {
    event.preventDefault();

    var productsLocalStorage = JSON.parse(
      localStorage.getItem("products") || ""
    );

    if (sortName === "цене" && sortderection === "возрастанию") {
      setSortNameTitle("Цена");

      const pnew = productsLocalStorage.sort(
        (a: { price: number }, b: { price: number }) =>
          a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );

      setProductsState((prevVal: any) => {
        return pnew;
      });
    } else if (sortName === "цене" && sortderection === "убыванию") {
      setSortNameTitle("Цена");

      const pnew = productsLocalStorage.sort(
        (a: { price: number }, b: { price: number }) =>
          a.price < b.price ? 1 : b.price < a.price ? -1 : 0
      );

      setProductsState((prevVal: any) => {
        return pnew;
      });
    } else if (sortName === "названию" && sortderection === "возрастанию") {
      setSortNameTitle("Название");

      const pnew = productsLocalStorage.sort(
        (a: { name: string }, b: { name: string }) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );

      setProductsState((prevVal: any) => {
        return pnew;
      });
    } else if (sortName === "названию" && sortderection === "убыванию") {
      setSortNameTitle("Название");

      const pnew = productsLocalStorage.sort(
        (a: { name: string }, b: { name: string }) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );

      setProductsState((prevVal: any) => {
        return pnew;
      });
    }

    setShowSort((prevValue) => {
      return !prevValue;
    });
  }

  function leftSortSubmit(event: any) {
    event.preventDefault();

    if (leftFilterButtonId === "show") {
      let minPrice = event.currentTarget[0].value || 0;
      let maxPrice = event.currentTarget[1].value || 10000;
      let brand = event.currentTarget[2].value;

      const brands: string[] = [];

      if (brand !== "") {
        brands.push(brand);
      }

      for (var i = 3; i < 7; i++) {
        if (event.currentTarget[i].checked) {
          switch (i) {
            case 3:
              brands.push("AOS");
              break;
            case 4:
              brands.push("ARIEL");
              break;
            case 5:
              brands.push("BIMAX");
              break;
            case 6:
              brands.push("BIOMIO");
              break;
            default:
          }
        }
      }

      const products = JSON.parse(localStorage.getItem("products") || "");

      let filteredProducts: {
        imageUrl: string;
        iconUrl: string;
        amount: string;
        brand: string;
        name: string;
        code: number;
        manufacturer: string;
        price: number;
        typeOfCare: string;
        key: string;
      }[] = [];

      for (let i = 0; i < products.length; i++) {
        if (
          products[i].price >= minPrice &&
          products[i].price <= maxPrice &&
          brands.includes(products[i].brand)
        ) {
          filteredProducts.push(products[i]);
        }
      }

      setProductsState((prevVal: any) => {
        return filteredProducts;
      });
    } else if (leftFilterButtonId === "clean") {
      event.currentTarget[0].value = "";
      event.currentTarget[1].value = "";
      event.currentTarget[2].value = "";

      for (let i = 3; i < 7; i++) {
        event.currentTarget[i].checked = false;
      }

      const products = JSON.parse(localStorage.getItem("products") || "");

      setProductsState((prevVal: any) => {
        return products;
      });
    }
  }

  function clickLeftSortButton(event: any) {
    setLeftFilterButtonId((prev) => {
      return event.target.id;
    });
  }

  function deleteProduct(id: string) {
    const newProductsArray = productsState.filter((product: any) => {
      return product.key !== id;
    });

    setProductsState((prev: any) => {
      return prev.filter((product: any) => {
        return product.key !== id;
      });
    });

    localStorage.setItem("products", JSON.stringify(newProductsArray));
  }

  function showAddMenu() {
    setAddNewProduct(true);
  }

  function closeAddMenu() {
    setAddNewProduct(false);
  }

  function newProductInfoHandleChange(event: any) {
    event.preventDefault();

    const { name, value } = event.target;

    setNewProductInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addNewProductClick() {
    let lastKey = productsState[productsState.length - 1].key;
    let lastKeyNumber = +lastKey.substring(1);
    let newKey = lastKeyNumber + 1;
    const newKeyString = "p" + newKey;

    const fullNewProduct = { ...newProductInfo, key: newKeyString };

    const newProductsArray = [...productsState, fullNewProduct];

    localStorage.setItem("products", JSON.stringify(newProductsArray));

    setProductsState((prev: any) => {
      return [...prev, fullNewProduct];
    });

    setAddNewProduct(false);
  }

  function updateProduct(updatedProduct: any) {
    setProductsState((prev: any) => {
      const updatedArray = [];

      for (var i = 0; i < prev.length; i++) {
        if (prev[i].key === updatedProduct.key) {
          const object = {
            imageUrl: updatedProduct.imageUrl,
            iconUrl: updatedProduct.iconUrl,
            amount: updatedProduct.amount,
            brand: updatedProduct.brand,
            name: updatedProduct.name,
            code: updatedProduct.code,
            manufacturer: updatedProduct.manufacturer,
            price: updatedProduct.price,
            typeOfCare: updatedProduct.typeOfCare,
            key: updatedProduct.key,
          };

          updatedArray.push(object);
          continue;
        }

        updatedArray.push(prev[i]);
      }

      localStorage.setItem("products", JSON.stringify(updatedArray));

      return updatedArray;
    });
  }

  function pageButtonRight() {
    let pageIdNum = pageCount + 1;

    switch (pageIdNum) {
      case 1:
        page5.current?.classList.remove("backgound");
        page1.current?.classList.add("backgound");
        break;
      case 2:
        page1.current?.classList.remove("backgound");
        page2.current?.classList.add("backgound");
        break;
      case 3:
        page2.current?.classList.remove("backgound");
        page3.current?.classList.add("backgound");
        break;
      case 4:
        page3.current?.classList.remove("backgound");
        page4.current?.classList.add("backgound");
        break;
      case 5:
        page4.current?.classList.remove("backgound");
        page5.current?.classList.add("backgound");
        break;
      case 6:
        page5.current?.classList.remove("backgound");
        page1.current?.classList.add("backgound");
        break;
      default:
    }

    setPageCount((prev: number) => {
      if (prev === 5) {
        prev = 0;
      }
      return prev + 1;
    });
  }

  function pageButtonLeft() {
    let pageIdNum = pageCount - 1;

    if (pageIdNum === 0) {
      pageIdNum = 5;
    }



    switch (pageIdNum) {
      case 2:
        page3.current?.classList.remove("backgound");
        page2.current?.classList.add("backgound");
        break;
      case 3:
        page4.current?.classList.remove("backgound");
        page3.current?.classList.add("backgound");
        break;
      case 4:
        page5.current?.classList.remove("backgound");
        page4.current?.classList.add("backgound");
        break;
      case 5:
        page1.current?.classList.remove("backgound");
        page5.current?.classList.add("backgound");
        break;
      case 1:
        page5.current?.classList.remove("backgound");
        page1.current?.classList.add("backgound");
        break;
      default:
    }

    setPageCount((prev: number) => {
      if (prev === 1) {
        prev = 6;
      }
      return prev - 1;
    });
  }

  return (
    <div>
      <Header bascketCount={headerBascketCount} />

      <div className="current-page">
        <p className="current-title">Главная</p>
        <img src="/images/catalogPage/line.svg"></img>
        <p className="next-page">Косметика и гигиена</p>
      </div>

      <div className="title-sort">
        <h1 className="title">КОСМЕТИКА И ГИГИЕНА</h1>

        <div className="sort">
          <p className="sort-text">Сортировка:</p>
          <p className="sort-name">{sortNameTitle}</p>
          <img
            onClick={downIconClick}
            className="down-icon"
            src="/images/catalogPage/down.svg"
          ></img>

          {showSort ? (
            <div className="sort-options">
              <form onSubmit={formSubmit}>
                <label className="sort-label">Сортировать по:</label>
                <select
                  value={sortName}
                  onChange={(e) => {
                    setSortName(e.target.value);
                  }}
                >
                  <option>названию</option>
                  <option>цене</option>
                </select>
                <br></br>
                <label className="sort-label">Сортировать по:</label>
                <select
                  value={sortderection}
                  onChange={(e) => {
                    setSortDerection(e.target.value);
                  }}
                >
                  <option>возрастанию</option>
                  <option>убыванию</option>
                </select>
                <br></br>
                <button className="sort-submit" type="submit">
                  Показать
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>

      <div className="category">
        {DATA.sections.map((s) => {
          const tabIndex = +s.id.substring(1);

          return (
            <CategoryCard
              setProductsState={sortInCategoryCard}
              state="top"
              tabindex={tabIndex}
              sectionName={s.name}
              key={s.id}
            />
          );
        })}
      </div>

      <div className="main-block">
        <div className="left-filter">
          <form onSubmit={leftSortSubmit}>
            <p className="left-filter-title">ПОДБОР ПО ПАРАМЕТРАМ</p>

            <p className="left-filter-price">
              Цена <span>₸</span>
            </p>

            <div className="left-filter-price-range">
              <input
                className="left-filter-price-val"
                name="min"
                placeholder="0"
              ></input>
              <div className="dash"></div>
              <input
                className="left-filter-price-val"
                placeholder="10 000"
              ></input>
            </div>

            <p className="manufacturer">Производитель</p>

            <div className="left-filter-input">
              <input
                className="left-filter-search"
                placeholder="Поиск..."
              ></input>
              <img
                className="left-filter-search-icon"
                src="/images/header/searchIcon.svg"
              ></img>
            </div>

            <div className="left-filter-check-boxes">
              <div>
                <input type="checkbox"></input>
                <label>AOS</label>
              </div>
              <div>
                <input type="checkbox"></input>
                <label>ARIEL</label>
              </div>
              <div>
                <input type="checkbox"></input>
                <label>BIMAX</label>
              </div>
              <div>
                <input type="checkbox"></input>
                <label>BIOMIO</label>
              </div>
            </div>

            <div className="buttons-block">
              <button
                onClick={clickLeftSortButton}
                id="show"
                type="submit"
                name="show"
                className="buttons-block-show"
              >
                Показать
              </button>
              <button
                onClick={clickLeftSortButton}
                id="clean"
                type="submit"
                name="clean"
                className="buttons-block-basket"
              >
                <img
                  className="bascket-on-clean-button"
                  src="/images/catalogPage/deletebascket.svg"
                ></img>
              </button>
            </div>
          </form>

          <img
            className="horizontal-line"
            src="/images/catalogPage/horizontalLine.svg"
          ></img>

          {DATA.sections.map((s) => {
            const tabIndex = +s.id.substring(1);

            return (
              <CategoryCard
                setProductsState={sortInCategoryCard}
                state="left"
                tabindex={tabIndex}
                sectionName={s.name}
                key={s.id}
              />
            );
          })}
        </div>

        <div className="right-part">
          <div className="products">
            {productsState.map((product: any) => {
              return (
                <ProductCard
                  id={product.key}
                  key={product.key}
                  imageUrl={product.imageUrl}
                  iconUrl={product.iconUrl}
                  amount={product.amount}
                  brand={product.brand}
                  name={product.name}
                  code={product.code}
                  manufacturer={product.manufacturer}
                  price={product.price}
                  typeOfCare={product.typeOfCare}
                  setBascketCount={setBascketCount}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                />
              );
            })}

            <div className="add-product">
              {addNewProduct ? (
                <div>
                  <div className="form-add-product">
                    <label>URL картинки:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="imageUrl"
                      value={newProductInfo.imageUrl}
                    ></input>

                    <label>URL иконки:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="iconUrl"
                      value={newProductInfo.iconUrl}
                    ></input>

                    <label>Оъем / Вес:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="amount"
                      value={newProductInfo.amount}
                    ></input>

                    <label>Бренд:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="brand"
                      value={newProductInfo.brand}
                    ></input>

                    <label>Название:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="name"
                      value={newProductInfo.name}
                    ></input>

                    <label>Штрихкод:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="number"
                      name="code"
                      value={newProductInfo.code}
                    ></input>

                    <label>Производитель:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="manufacturer"
                      value={newProductInfo.manufacturer}
                    ></input>

                    <label>Цена:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="number"
                      name="price"
                      value={newProductInfo.price}
                    ></input>

                    <label>Тип ухода:</label>
                    <input
                      onChange={newProductInfoHandleChange}
                      type="text"
                      name="typeOfCare"
                      value={newProductInfo.typeOfCare}
                    ></input>

                    <button onClick={addNewProductClick}>Добавить</button>
                    <button onClick={closeAddMenu}>Отменить</button>
                  </div>
                </div>
              ) : (
                <button className="plus-button" onClick={showAddMenu}>
                  <img src="/images/catalogPage/plus.png"></img>
                </button>
              )}
            </div>
          </div>

          <div className="pages">
            <p id="1" ref={page1} className="number backgound">
              1
            </p>
            <p id="2" ref={page2} className="number">
              2
            </p>
            <p id="3" ref={page3} className="number">
              3
            </p>
            <p id="4" ref={page4} className="number">
              4
            </p>
            <p id="5" ref={page5} className="number">
              5
            </p>

            <button className="arrow-right" onClick={pageButtonRight}>
              <img src="/images/catalogPage/arrowright.svg"></img>
            </button>

            <button className="arrow-left" onClick={pageButtonLeft}>
              <img src="/images/catalogPage/arrowleft.svg"></img>
            </button>
          </div>

          <div className="text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
              mattis vulputate feugiat massa vestibulum duis. Faucibus
              consectetur aliquet sed pellentesque consequat consectetur congue
              mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim,
              malesuada.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CatalogPage;
