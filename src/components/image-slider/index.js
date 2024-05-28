import {useState,useEffect} from 'react'
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs'
import "./style.css"
const ImageSlider = ({url,limit=10,page=1}) => {
    const [images,setImages]=useState([])
    const [currentSlide,setCurrentSlide]=useState(0)
    const [errorMsg,setErrorMsg]=useState("")
    const [loading,setLoading]=useState(false)
    async function fetchImage(geturl){
        try{
            setLoading(true)
            const res=await fetch(`${geturl}?page=${page}&limit=${limit}`)
            const data=await res.json();
            if(data){
                setImages(()=>data)
            }
            setLoading(false)
        }catch(err){
            setLoading(false)
            setErrorMsg(err.message)
            
        }
    }
    useEffect(()=>{
        if(url !==''){
            fetchImage(url)
        }
    },[url])
    const handleLeftClick=()=>{
        if(currentSlide===0){
            setCurrentSlide(images.length-1)
        }else{
            setCurrentSlide((state)=>state-1)
        }
    }
    const handleRightClick=()=>{
        if(currentSlide===images.length-1){
            setCurrentSlide(0)
        }else{
            setCurrentSlide((state)=>state+1)
        }
    }
    if(loading){
        return <div>Loading....!!!</div>
    }
    if(errorMsg){
        return <div>Error Occured....!!!</div>
    }
  return (
    <div className='container'>
        <BsArrowLeftCircleFill onClick={handleLeftClick} className="arrow arrow-left"/>
        {
            images && images.length>0?
                images.map((imageItem)=>{
                    // using css for hiding the rest of the images is better as doing it with conditionaly render makes few ms of images load as white
                    return <img 
                    className={currentSlide ==imageItem.id?'current-image':'current-image hide-current-image'}
                    key={imageItem.id} 
                    src={imageItem.download_url} 
                    alt={imageItem.author}/>
                })
            :null
        }
        <BsArrowRightCircleFill onClick={handleRightClick} className='arrow arrow-right'/>
        <span className='circle-indicators'>
            {
                images && images.length>0?
                images.map((_,index)=><button 
                onClick={()=>setCurrentSlide(index)}
                key={index} 
                className={currentSlide===index?'current-indicator':'current-indicator inactive-indicator'}></button>):null
            }
        </span>
    </div>
  )
}

export default ImageSlider