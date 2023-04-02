import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);

    if(isOpen === true){
        // alert("Cleaning!");

        localStorage.setItem("totalProductsPrice", JSON.stringify(0));
        localStorage.setItem("purchases", JSON.stringify([]));
        localStorage.setItem("bascketCount", JSON.stringify(0));




    }
    

  };

  return {
    isOpen,
    toggle
  };
}
