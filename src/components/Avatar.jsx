import React from 'react'
import placeholder from "/placeholder.jpg";


export default function Avatar({src,h,w}) {
  return (
    <img
    className="rounded-full" 
      height={h} 
      width={w} 
      alt="Avatar" 
      src={src || placeholder} 
    />
  )
}
