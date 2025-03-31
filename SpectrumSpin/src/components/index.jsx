import { useEffect, useState } from "react";

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
useEffect(()=>{
    handleCreateRandomColor();
},[typeOfColor]);
  
  
    return (
    <div style={{width: '100vw',
        height:"100vh",
        background:color,
    }}className="container">
        <button onClick={()=>setTypeOfColor("hex")}>Generate HEX Color</button>
        <button onClick={()=>setTypeOfColor("rgb")}>Generate RGB Color</button>
        <button onClick={handleCreateRandomColor}>Generate Random Color</button>
        <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    color:"white",
fontSize:"60px",
marginTop:'50px',
flexDirection:"column",
gap:"20px"
        }}>
            <h3>{typeOfColor==="hex"?"HEX":"RGB"}</h3>
            <h2>{color}</h2>
        </div>
    </div>
  );
}