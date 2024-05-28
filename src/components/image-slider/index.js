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
            console.log(images)
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
    console.log(images)
    if(loading){
        return <div>Loading....!!!</div>
    }
    if(errorMsg){
        return <div>Error Occured....!!!</div>
    }
  return (
    <div className='container'>
        <BsArrowLeftCircleFill className="arrow arrow-left"/>
        {
            images && images.length>0?
                images.map((imageItem)=>{
                    return <img 
                    className='current-image'
                    key={imageItem.id} 
                    src={imageItem.download_url} 
                    alt={imageItem.author}/>
                })
            :null
        }
        <BsArrowRightCircleFill className='arrow arrow-right'/>
        <span className='circle-indicators'>
            {
                images && images.length>0?
                images.map((_,index)=><button key={index} className='current-indicator'></button>):null
            }
        </span>
    </div>
  )
}

export default ImageSlider