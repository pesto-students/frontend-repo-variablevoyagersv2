import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import PropertyCard from '../../components/common/PropertyCard';
import { axiosPrivate } from '../../services/axios.service';
import Loader from '../../components/common/Loader';
import Categories from '../../components/common/Categories';

const HomePage = () => {
	// enable this For testing protected router

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getProperties();
	}, []);

	// enable this For testing protected router
	async function getProperties() {
		try {
			setLoading(true);
			const { data } = await axiosPrivate.get('/property');
			setProperties(data.data)
			console.log('GET D', data);
		} catch (error) {
			console.log('GET', error);
		}
		finally {
			setLoading(false);
		}
	}

	if (loading) {
		return <Loader />;
	}


	return (
		<>
			<div className="px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{/* enable this For testing protected router */}
				{/* <button onClick={() => getById()}>Click</button> */}
				{properties?.map((property) => (
					<Link key={property.id} to={`/property-detail/${property.id}`}>
						<PropertyCard property={property} />
					</Link>
				))}
			</div>
		</>
	);
};

export default HomePage;
