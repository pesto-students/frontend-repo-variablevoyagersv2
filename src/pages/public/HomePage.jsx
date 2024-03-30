import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import PropertyCard from '../../components/common/PropertyCard';
import { axiosPrivate } from '../../services/axios.service';

const HomePage = () => {
	// enable this For testing protected router

	const [properties, setProperties] = useState([]);

	useEffect(() => {
		getProperties();
	}, []);

	// enable this For testing protected router
	async function getProperties() {
		try {
			const { data } = await axiosPrivate.get('/property');
			setProperties(data.data)
			console.log('GET D', data);
		} catch (error) {
			console.log('GET', error);
		}
	}




	return (
		<Container>
			<div className="mt-32">
				<div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{/* enable this For testing protected router */}
					{/* <button onClick={() => getById()}>Click</button> */}
					{properties?.map((property) => (
						<Link key={property.id} to={`/property-detail/${property.id}`}>
							<PropertyCard property={property}/>
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
