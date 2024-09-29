import { useState } from "react";
import { useEffect } from "react";
function Display(){

    const saveData =[JSON.parse(localStorage.getItem("data"))];

    const [value , setValue]=useState("");
    const [pps, setpps]=useState([...saveData]);
    const [sympol, setsympol]=useState(false);
    const [number, setnumber]=useState(false);
    const [upper, setupper]=useState(false);
    const [lower, setlower]=useState(false);
    const[num1, setnum1]=useState(0);
    const[num2, setnum2]=useState(0);
    const[num3, setnum3]=useState(0);
    const[num4, setnum4]=useState(0);

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
    
    function change1(){
        if(num1==0){
            setsympol(true)
            setnum1(1)
        }else{
            setsympol(false)
            setnum1(0)
        }
        
    }
    function change2(){
        if(num2==0){
            setnumber(true)
            setnum2(1)
        }else{
            setnumber(false)
            setnum2(0)
        }
    }
    function change3(){
        if(num3==0){
            setupper(true)
            setnum3(1)
        }else{
            setupper(false)
            setnum3(0)
        }
    }
    function change4(){
        if(num4==0){
            setlower(true)
            setnum4(1)
        }else{
            setlower(false)
            setnum4(0)
        }
    }
    const length=12;


    function clear(){
        setValue("");
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

        <h1>GENERATE WITH</h1>

        <div className="checkbox">
            sympol
            <input type="checkbox"value={sympol} onClick={()=>change1()}/>
            number
            <input type="checkbox"value={number} onClick={()=>change2()}/>
        </div>
        <div className="checkbox">
        uppercase
            <input type="checkbox"value={upper} onClick={()=>change3()}/>
            loercase
            <input type="checkbox"value={lower} onClick={()=>change4()}/>
        </div>

        <div className="input-btn">
            <input id="in"  value={value} readOnly  placeholder="press generate..."/>
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