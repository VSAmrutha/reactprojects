import {useState} from 'react'
import data from "./data.js"
import "./style.css"
const Accordion = () => {
    const [enableMultiSelect,setEnableMultiSelect]=useState(false)
    const [selected,setSelected]=useState(null)
    const [multuSelected,setMultiSelected]=useState([])
   const handleSingsleSelection=(id)=>{
    console.log(id)
    if(id===selected){
        setSelected("")
    }else{
        setSelected(id)
    }
   
   }
   const handleMultiSelect=(id)=>{
    const arr=[...multuSelected];
    const indexOfId=arr.indexOf(id)
    if(indexOfId===-1){
        arr.push(id)
        
    }else{
        arr.splice(indexOfId,1)
    }
    setMultiSelected((state)=>{
        return [...arr]
    })
   }
  const handleEnable=()=>{
    setSelected("")
    setMultiSelected([])
    setEnableMultiSelect((state)=>!state)
  }
  return (
    <div className="acc-wrapper">
        <button onClick={handleEnable}>Enable Multi Select</button>
        <div className='accordion'>
            {
                data && data.length>0 ? data.map((dataItem)=>{
                    return (
                        <div className='item' key={dataItem.id}>
                            <div onClick={enableMultiSelect?()=>handleMultiSelect(dataItem.id):()=>handleSingsleSelection(dataItem.id)} className='title'>
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                                </div>
                                {enableMultiSelect?multuSelected.includes(dataItem.id) && <div className="acc-content ">
                                    {dataItem.answer}
                                </div>:selected===dataItem.id && <div className="acc-content ">
                                    {dataItem.answer}
                                </div>}
                                
                        </div>
                    )
                }):<div>No data found</div>
            }
        </div>

    </div>
  )
}
export default Accordion;
