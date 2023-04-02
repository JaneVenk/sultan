import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CatalogPage from "./pages/CatalogPage";
import BascketPage from "./pages/BascketPage";
import { Link, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

import DATA from "./DATA.json";

function App() {
  const [bascketCount, setBascketCount] = useState(
    JSON.parse(localStorage.getItem("bascketCount") || "0")
  );

  function onClickButton() {
    setBascketCount((prevValue: number) => {
      return ++prevValue;
    });
  }

  useEffect(() => {
    const purchasesSet = localStorage.getItem("purchases") === null;

    if (purchasesSet) {
      localStorage.setItem("purchases", JSON.stringify([]));
    }

    const bascketCountLocal = localStorage.getItem("bascketCount") === null;

    if (bascketCountLocal) {
      localStorage.setItem("bascketCount", JSON.stringify(0));
    }

    const pr = localStorage.getItem("products") === null;

    if (pr) {
      const products = DATA.products;

      localStorage.setItem("products", JSON.stringify(products));
    }

    const totalPrice = localStorage.getItem("totalProductsPrice") === null;

    if (totalPrice) {
      localStorage.setItem("totalProductsPrice", JSON.stringify(0));
    }
  }, []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage
              headerBascketCount={bascketCount}
              setBascketCount={onClickButton}
            />
          }
        ></Route>
        <Route path="/page/:name" element={<ProductPage />}></Route>
        <Route
          path="/bascket"
          element={<BascketPage headerBascketCount={bascketCount} />}
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
