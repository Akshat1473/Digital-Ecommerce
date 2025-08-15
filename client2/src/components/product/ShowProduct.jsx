import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
import RelatedProduct from './RelatedProduct'



const ShowProduct = () => {
  const { products,filteredData ,addToCart} = useContext(AppContext)

  return (
    <>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 m-16">
      {filteredData?.map((product) => (
        <div key={product.id} className="flex flex-col items-center">
          <Link
          to={`/product/${product._id}`}
          >
            <img
            src={product.imgSrc}
            alt={product.title}
            className="w-full h-[360px] object-cover rounded-lg border-2 border-yellow-400"
          />
          </Link>
          
          <h1 className="mt-2 text-center">{product.title}</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2">
            {product.price} Rs
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2" onClick={()=>
            addToCart(product._id,product.title,product.price,
              1,
            product.imgSrc)
          }>
            Add To Cart
          </button>
        </div>
      ))}

     
    </div>
    </>
  )
}

export default ShowProduct


