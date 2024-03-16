import React, { useEffect, useState } from 'react'
import "./style.css"

export const Scroll = () => {
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(true)
    const [errMessage , setErrMessage] = useState("")
    const [scroll , setScroll] = useState(0)

    async function fetchData () {
        try {
          const response = await  fetch("https://dummyjson.com/products?limit=100")
          const data = await response.json()
          console.log(data);
          if(data && data.products.length){
            setProducts(data.products)
           
          }else{
            setErrMessage("No product found")
          }
            
        } catch (error) {
            setErrMessage("Error fetching data")
            
            
        }finally{
            setLoading(false)

        }
       
    }

    useEffect(()=>{
        fetchData();

        const updateScroll = ()=>{
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const update = (scrolled / scrollHeight) * 100;

            setScroll(update)
        };
        window.addEventListener("scroll" , updateScroll)

    },[]);

  return (
    <div className='main'>
        <div className='navbar'>
            <h1>Custom Scroll Indicator</h1>
            

        </div>
        <span className='line' style={{width: `${scroll}%`}}></span>
        <div className='scroll-container'>
            {loading && <p>Loading...</p>}
            {errMessage && <p>{errMessage}</p>}
            {!loading && !errMessage && (
            <div className='title-container'>
              {products.map((product , index)=>{
                return <p className='title' key={index}>{product.title}</p>
              })}

            </div>)}
            

        </div>
    </div>
  )
}
