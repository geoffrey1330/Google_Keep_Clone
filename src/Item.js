import React from "react";
import "./components/Header.css";
import color from "./color";
import { useGlobalContext } from "./context";
import "./App.css";

const Item = ({ id, item, list, setList, col, title, show1 }) => {
  const { openModal } = useGlobalContext();

  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  const handleItem = (e) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            item: e.target.value,
          };
        }

        return el;
      })
    );
  };

  const handleShow = (e) => {
    let a = e.target.getBoundingClientRect();
    console.log(a.y);
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            show1: !show1,
          };
        }

        return el;
      })
    );
  };

  const handleColor = (color) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            col: color,
          };
        }
        return el;
      })
    );
  };

  return (
    <div>
      <input
        type="text"
        style={{ backgroundColor: `${col}` }}
        //className="item"
        value={item}
        onChange={handleItem}
        onClick={openModal}
        className="item btn"
      />

      <i onClick={handleShow} className="fa fa-paint-brush"></i>
      {show1 && (
        <div className="cart-dropdown">
          <div className="cart-items">
            {color.map((color, i) => {
              return (
                <div key={i}>
                  <button
                    className="blue"
                    type="button"
                    style={{ backgroundColor: `${color.color}` }}
                    onClick={() => handleColor(color.color)}
                  ></button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <i onClick={() => remove(id)} className="fa fa-trash"></i>
      <br></br>
      <br></br>
    </div>
  );
};

export default Item;
