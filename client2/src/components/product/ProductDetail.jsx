import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'

const ProductDetail = () => {
  const [product, setProduct] = useState()
  const { id } = useParams()
  const url = 'http://localhost:2000/api'

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        setProduct(api.data.product)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <>
    
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="w-full max-w-md lg:sticky lg:top-10">
            <img
              src={product?.imgSrc}
              alt={product?.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product?.title}</h1>
          <p className="text-gray-300 mb-4">{product?.description}</p>
          <h2 className="text-xl font-semibold mb-6">{product?.price} Rs</h2>

          <div className="flex gap-4">
            <button className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-2xl cursor-pointer">
              Buy Now
            </button>
            <button className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded-2xl cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
      {/* {/* here pass category as props which and we see similar product in below side of that product */}
    </div>
      <RelatedProduct category={product?.category}/>
    </>
  )
}

export default ProductDetail
