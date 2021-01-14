import React from "react";
import "./components/Header.css";
import color from "./color";
import { useGlobalContext } from "./context";
import "./App.css";

const Delete=({removed,setRemoved,col,list,setList})=>{

const remover = (id) => {
     setRemoved(removed.filter((el) => el.id !==id));
    
    };
const adder=(id)=>{
    const newDel=removed.filter((el) => el.id ===id);
    setList([...list,...newDel]);
    setRemoved(removed.filter((el) => el.id !==id));
}
    
    return(
       <div className="">
           
           <h1>TRASH</h1>
           {removed.length!==0?<button  onClick={() =>setRemoved([])}>Clear Trash</button>:""}
           {removed.map((remove)=>{
               
               return(
                <div style={{ marginTop:"10px",display:"block" }}>
                <div
                    type="text"
                    style={{ backgroundColor: `${remove.col}` }}
                    //className="item"
                    
                    className="item btn"
                    >
                        <h3>{remove.title}</h3>
                <input
                    type="text"
                    
                    //className="item"
                    value={remove.item}
                    style={{backgroundColor: `${remove.col}`,marginRight:"3px",border:"0px solid",textAlign:"center", textTransform: "uppercase" }}
                    className=""
                />
                </div>
                  <i  onClick={() =>adder(remove.id)} className="fa fa-cog"></i>
                 <i onClick={() =>remover(remove.id)} className="fa fa-trash "></i>

                </div>
                
               )   
           }
            
           )}
        
       </div>
    )
};

export default Delete;