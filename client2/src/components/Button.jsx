// import React from 'react'

// const Button = ({ label }) => {
//   return (
//     <button
//       className="
//         bg-amber-600 
//         hover:bg-amber-700 
//         text-white 
//         font-semibold 
//         px-6 
//         py-2 
//         rounded-full 
//         shadow-md 
//         hover:shadow-lg 
//         transition-all 
//         duration-300 
//         ease-in-out
//       "
//     >
//       {label}
//     </button>
//   )
// }

// export default Button
const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-amber-600 
        hover:bg-amber-700 
        text-white 
        font-semibold 
        px-6 
        py-2 
        rounded-full 
        shadow-md 
        hover:shadow-lg 
        transition-all 
        duration-300 
        ease-in-out
      "
    >
      {label}
    </button>
  )
}

export default Button
