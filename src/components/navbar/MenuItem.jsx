// import React from 'react'

// export default function MenuItem({onClick,label}) {
//   return (
//     <div
//     onClick={onClick} 
//       className="
//         px-4 
//         py-3 
//         hover:bg-neutral-100 
//         transition
//         font-semibold
//       "
//     >{label}</div>
//   )
// }

//     {//----------------------------------------------------------------}
//       <div className="bg-gray-500 mb-2 w-[300px] rounded-lg flex ">
//       {property?.propertyImages.length > 0 ? (
//           <img
//               className="rounded-lg object-cover aspect-square w-full"
//               src={property.propertyImages[0]?.imgUrl}
//               alt=""
//           />
//       ):(<img
//           className="rounded-lg object-cover aspect-square"
//           src={ImagePlaceholder}
//           alt=""
//       />)}
//   </div>
//   <h3 className="font-semibold text-lg">{property?.propertyName}</h3>
//   <h2 className="text-gray-500">{property?.city}, {property?.country}</h2>
//   {/* <Heading name={property?.propertyName} city={property?.city} country={property?.country}/> */}
//   <div className="mt-1">
//       <span className="font-semibold "><FormatPrice price={property.price} /></span> per day
//   </div>