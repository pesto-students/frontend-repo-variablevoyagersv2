import React from 'react'
import placeholder from "/placeholder.jpg";


export default function Avatar({src}) {
  return (
    <img
    className="rounded-full" 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src || placeholder} 
    />
  )
}
