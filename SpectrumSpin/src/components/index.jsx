import { useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
const[color, setColor]=useState("#000000");
  

function handleCreateRandomColor(){
    if(typeOfColor==="hex"){
        setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    }else if(typeOfColor==="rgb"){
        setColor(`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`);
    }
}
  
  
    return (
    <div style={{width: '100vw',
        height:"100vh",
        background:color,
    }}className="container">
        <button onClick={()=>setTypeOfColor("hex")}>Generate HEX Color</button>
        <button onClick={()=>setTypeOfColor("rgb")}>Generate RGB Color</button>
        <button onClick={handleCreateRandomColor}>Generate Random Color</button>
    </div>
  );
}
