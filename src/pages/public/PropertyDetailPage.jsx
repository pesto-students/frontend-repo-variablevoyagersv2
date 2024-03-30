import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../../services/axios.service';

const PropertyDetailPage = () => {
  
	const [property, setProperty] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    getProperty()
  }, []);

  async function getProperty() {
		try {
			const { data } = await axiosPrivate.get(`/property/${id}`);
			setProperty(data.data)
			console.log('GET ID', data);
		} catch (error) {
			console.log('GET', error);
		}
	}

  return (
    <div className='mt-12 flex-grow flex justify-center items-center max-h-screen'>{property?.propertyName}</div>
  )
}

export default PropertyDetailPage