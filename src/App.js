import React, { useState } from "react";
import "./App.css";
import Item from "./Item";
import Delete from "./delete";
// import Edit from "./edit";
import { v4 as uuidv4 } from "uuid";
import "./components/Header.css";
import color from "./color";
import Header from "./components/Header";
import Modal from "./Modal"

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

const arr2 = () => {
  let data2 = localStorage.getItem("data2");
  if (data2) return JSON.parse(localStorage.getItem("data2"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [trash, setTrash] = useState(false);
  const [edit,setEdit]=useState(false)
  const [showbar, setShowbar] = useState(false);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState(arr);
  const[remove,setRemove]=useState(arr2);
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
      console.log(list);
      setTitle("");
      setItem("");
      setCol("");
      setShow(false);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
    localStorage.setItem("data2", JSON.stringify(remove));
  }, [list,remove]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };
  const handleColor = (color) => {
    setCol(color);
  }; 

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterTodos = list.filter((todo) => {
    return todo.item.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="App">
      <Header
        onSearchChange={handleSearch}
        search={search}
        setShowbar={setShowbar}
        showbar={showbar}
        trash={trash}
        setTrash={setTrash}
        edit={edit}
        setEdit={setEdit}
      />
      {trash &&
      <Delete
      removed={remove}
      setRemoved={setRemove}
      col={col}
      list={list}
      setList={setList}
      />}      

      <Modal />
      {!trash &&
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
                      backgroundColor: "transparent blue",
                    }}
                     
                  >
                    ADD
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
                    <i className="fa fa-paint-brush "></i>
                  </button>
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color:"red"
                      
                    }}
                    onClick={() => setToggle(!toggle)}
                  >
                    X
                  </button>
                  
                  {show && (
                    <div className="cart-dropdown ">
                      <div className="cart-items ">
                        {color.map((color, i) => {
                          return (
                            <div key={i}>
                              <button
                                className="blue "
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
      </form>}
      <br></br>
      {!trash &&
      <div>
      
        {filterTodos.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            col={c.col}
            title={c.title}
            show1={c.show1}
            removed={remove}
            setRemoved={setRemove}
          />
        ))}
      </div>}
      {/* {!edit &&
      <div>
        {filterTodos.map((c, id) => (
          <Edit
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            col={c.col}
            title={c.title}
            show1={c.show1}
            removed={remove}
            setRemoved={setRemove}
          />
        ))}
      </div>} */}

    </div>
  );
}

export default App;
