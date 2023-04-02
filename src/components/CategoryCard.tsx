import React, { useRef } from "react";
import "../styles/categoryCard.css";

interface Props {
  sectionName: string;
  tabindex: number;
  state: string;
  setProductsState(val: string): void;
}

function capitalize(str: string) {
  return str.toUpperCase();
}

const CategoryCard: React.FC<Props> = ({
  sectionName,
  tabindex,
  state,
  setProductsState,
}) => {
  const leftRef = React.useRef<HTMLInputElement>(null);

  function onClick() {
    setProductsState(sectionName);
  }

  return (
    <div>
      {state === "top" ? (
        <div
          onClick={onClick}
          className="category-card focus-style"
          tabIndex={tabindex}
        >
          <p ref={leftRef} className="category-card-name">
            {sectionName}
          </p>
        </div>
      ) : (
        <div>
          <p
            onClick={onClick}
            ref={leftRef}
            tabIndex={tabindex}
            className="sname"
          >
            {capitalize(sectionName)}
          </p>
          <img
            className="horizontal-line"
            src="/images/catalogPage/horizontalLine.svg"
          ></img>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
