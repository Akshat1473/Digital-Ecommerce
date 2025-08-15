
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext)
  const [relatedProducts, setRelatedProduct] = useState([])

  useEffect(() => {
    if (category && products.length > 0) {
      setRelatedProduct(
        products.filter(
          (data) =>
            data.category?.toLowerCase() === category.toLowerCase()
        )
      )
    }
  }, [category, products])

  return (
    <div className="m-8">
      <h1 className="text-xl font-bold mb-6">Related Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts?.map((product) => (
          <div key={product._id} className="flex flex-col items-center">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-[360px] object-cover rounded-lg border-2 border-yellow-400"
              />
            </Link>

            <h1 className="mt-2 text-center">{product.title}</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2 cursor-pointer">
              {product.price} Rs
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2 cursor-pointer">
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct

