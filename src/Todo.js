import React, { useState } from "react";
import "./App.css";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import "./components/Header.css";
import color from "./color";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function Todo() {
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState(arr);
  const [inputList] = useState([{ title: "", todo: "" }]);
  const [col, setCol] = useState("");

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      title: title,
      item: item,
      col: col,
      show1: false,
    };
    e.preventDefault();
    if (item) {
      setList([...list, newItem]);
      setTitle("");
      setItem("");
      setCol("");
      setShow(false);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };
  const handleColor = (color) => {
    setCol(color);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {!toggle ? (
          <input
            className="form-container"
            onClick={() => setToggle(!toggle)}
            placeholder="Take a note..."
            type="text"
          />
        ) : (
          <div className="f" style={{ backgroundColor: `${col}` }}>
            {inputList.map((x, i) => {
              return (
                <div key={i}>
                  <input
                    style={{ backgroundColor: `${col}` }}
                    placeholder="Title"
                    className="box"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    placeholder="Take a note..."
                    type="text"
                    className="box"
                    style={{ backgroundColor: `${col}` }}
                    value={item}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    <i className="fa fa-paint-brush"></i>
                  </button>
                  {show && (
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
                </div>
              );
            })}
          </div>
        )}
      </form>
      <br></br>
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            col={c.col}
            title={c.title}
            show1={c.show1}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
