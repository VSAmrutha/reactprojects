import {useState,useEffect} from 'react'

const RandomColor = () => {
    const [typeOfColor,setTypeOfColor]=useState('hex')
    const [color,setColor]=useState('black')
    useEffect(()=>{
        if(typeOfColor==='hex'){
            handleCreateRandomHexColor()
        }else{
            handleCreateRandomRgbColor()
        }
    },[typeOfColor])
    const randomColorUtility=(length)=>{
        return Math.floor(Math.random()*length)
    }
    const handleCreateRandomHexColor=()=>{
        const hex=[0,1,2,3,4,5,6,7,8,9,"A", "B", "C", "D", "E", "F"]
        let hexColor="#";
        for(let i=0;i<6;i++){
            hexColor +=hex[randomColorUtility(hex.length)]
        }
        setColor(hexColor)
    }
    const handleCreateRandomRgbColor=()=>{
        let rgbColor=[]
        for(let i=0;i<3;i++){
            rgbColor.push(randomColorUtility(256)) 
        }
        let rgbCode=`rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`
        setColor(rgbCode)
    }
  return (
    <div style={{width:'100vw',height:'100vh',backgroundColor:color,textAlign:'center'}}>
        <button onClick={()=>setTypeOfColor('hex')}>Create Hex Color</button>
        <button onClick={()=>setTypeOfColor('rgb')}>Create RGB Color</button>
        <button onClick={typeOfColor==='hex'?handleCreateRandomHexColor:handleCreateRandomRgbColor}>Generate Random Color</button>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'#fff',fontSize:'60px',marginTop:'50px'}}>
            <h3>{typeOfColor==='hex'?'Hex Color':'RGB Color'}</h3>
            <h3>{color}</h3>
        </div>
    </div>
  )
}

export default RandomColor