import React from 'react'
import { useParams } from 'react-router-dom';

const PropertyDetailPage = () => {
  const param = useParams();
  console.log(param);
  return (
    <div>PropertyDetailPage</div>
  )
}

export default PropertyDetailPage