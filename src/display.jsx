import { useState } from "react";
import { useEffect } from "react";
function Display(){

    const saveData =JSON.parse(localStorage.getItem("data"));

    const [value , setValue]=useState("");
    const [pps, setpps]=useState([...saveData]);
    

    useEffect(() =>{
        localStorage.setItem("data" , JSON.stringify(pps));
    });
    


    function generate(length,upper,lower,number,sympol){


        const lc="abcdefghijklmnopqrstuvwxyz"
        const uc="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const N="1234567890"
        const s="-_/"
        let chars="";
        let pasword="";

        if (upper) chars += uc;
        if (lower) chars += lc;
        if (number) chars += N;
        if (sympol) chars += s;

        for (let i = 0; i < length; i++) {
            pasword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

         setValue(pasword);
         console.log(sympol)
         console.log(number)
         
    }
    
    const lower=true;
    const upper=true;
    const sympol=true;
    const number=true;
    const length=12;


    function clear(){
        setValue("");
        setpps([]);
    }

    function addList(){
        const pas=document.getElementById("in").value;
        if(pas.trim() !== ""){
        setpps(p=>[...p,pas]);
        }
    }
   
    function deletes(index){
        const updateInfo=pps.filter((_,i)=>i !== index);
        setpps(updateInfo);
    }

    return(
        <>
        <h1 className="hello">WELCOME<br />  TO GENERATOR <br />PASWORD PAGE</h1>
        
        <div className="containor">


        <div className="input-btn">
            <input id="in"  value={value} readOnly  placeholder="...."/>
            <button className="btn-save" onClick={()=>addList()}>save</button>
        </div>
            <ul>
                {pps.map((pp,index) => 
                <li key={index}>{pp}
                    <button onClick={()=>deletes(index)}>delete</button></li>)}
            </ul>

        <h1>CLICK TO GENERATE</h1>
        <div className="btns">
        <button onClick={() => generate(length, upper, lower, number,sympol)}>generte</button>
        <button onClick={()=> clear()}>clear</button>
        </div>
        </div>
        </>
    )
    
}

export default Display