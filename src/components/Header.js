import React from "react";
import "./Header.css";
import "../App.css";
import { links } from "../data";

const Header = ({ onSearchChange, search, showbar, setShowbar,trash,setTrash,edit,setEdit }) => {
  return (
    <div>
      <ul>
        <li>
          <i className="fa fa-bars" onClick={() => setShowbar(!showbar)}></i>
        </li>
        <li>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
            alt="logo"
          />
        </li>
        <li>
          <h2>Keep</h2>
        </li>
        <li>
        <input
          style={{
            height: "30px",
            width: "600px",
            fontFamily: "FontAwesome",
            border: "none",
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "5px",
          }}
          className="search-box"
          placeholder="&#xF002; Search"
          type="search"
          onChange={onSearchChange}
          value={search}
        />
        </li>
      </ul>
      <hr></hr>
      {showbar && (
        <div>
          <ul className="links">
            {links.map((link) => {
              const { id, url, text, icon } = link;
              if(id===5){
                return (
                  <li key={id}>
                    
                    <a href={url} onClick={() => setTrash(!trash)} >
                    <a href={url} onClick={() => setEdit(true)} ></a>
                   
                      {icon}
                      {text}
                    </a>
                  </li>
                );
              }

              if(id===3){
                return (
                  <li key={id}>
                    <a href={url} onClick={() => setEdit(!edit)}>
                      {icon}
                      {text}
                    </a>
                  </li>
                );
              }
              return (
                <li key={id}>
                  <a href={url}>
                    {icon}
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!showbar && (
        <div>
          <ul className="links">
            {links.map((link) => {
              const { id, url, icon } = link;
              if(id===5){
                return (
                  <li key={id}>
                    <a href={url} onClick={() => setTrash(!trash)}>
                      {icon}
                    </a>
                  </li>
                );
              }
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Header;
