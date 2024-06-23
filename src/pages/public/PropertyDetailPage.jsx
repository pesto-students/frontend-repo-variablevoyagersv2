import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../../services/axios.service';
import PropertyHead from '../../components/propertyDetails/PropertyHead';
import PropertyDescriptions from '../../components/propertyDetails/PropertyDescriptions';
import PropertyReservation from '../../components/propertyDetails/PropertyReservation';
import Loader from '../../components/common/Loader';
import Reviews from '../../components/propertyDetails/Reviews';

import { CATEGORIES } from '../../constants/categories';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import customMarkerIcon from '/MapMarker2.png';
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const mapOptions = {
	streetViewControl: false,
	styles: [
		{
			featureType: 'poi.park',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'road',
			elementType: 'labels',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'poi.business',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'transit',
			stylers: [{ visibility: 'off' }],
		},
	],
};

const PropertyDetailPage = () => {
	const [loading, setLoading] = useState(null);
	const [property, setProperty] = useState(null);
	const [tags, setTags] = useState([]);
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_KEY,
		libraries: ['maps', 'places'],
	});

	const { id } = useParams();
	useEffect(() => {
		getProperty();
	}, []);

	async function getProperty() {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await axiosPrivate.get(`/property/${id}`);
			setProperty(data);
			setTags(CATEGORIES.filter((category) => data.propertyTags.includes(category.tagName)).map((ele) => ({ ...ele })));
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<div className=" w-auto mx-3 md:mx-20 mt-24	">
			<div className="flex flex-col gap-6">
				<PropertyHead
					propertyName={property?.propertyName}
					city={property?.city}
					country={property?.country}
					propertyImages={property?.propertyImages}
				/>
				<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 md:gap-24 mt-2">
					<div className="col-span-3 lg:col-span-4 flex flex-col gap-8 ">
						<PropertyDescriptions
							ownerName={property?.owner?.firstName}
							avatar={property?.owner?.avatar}
							capacity={property?.capacity}
							description={property?.description}
							address={property?.address}
							tags={tags}
							amenities={property?.amenities}
						/>
					</div>
					<div className="order-first mb-10 md:order-last md:col-span-3">
						<PropertyReservation property={property} />
					</div>
				</div>
				<hr />
				{!isLoaded ? (
					<h1>Loading...</h1>
				) : property?.lat ? (
					<>
						<GoogleMap
							mapContainerStyle={{
								width: '100%',
								height: '400px',
								borderRadius: '0.375rem',
							}}
							center={{ lat: Number(property?.lat), lng: Number(property?.lng) }}
							zoom={16}
							options={mapOptions}
						>
							<MarkerF
								position={{ lat: Number(property?.lat), lng: Number(property?.lng) }}
								icon={{
									url: customMarkerIcon,

									origin: new window.google.maps.Point(0, 0),
									anchor: new window.google.maps.Point(20, 40),
								}}
							/>
						</GoogleMap>
						<hr />
					</>
				) : (
					<></>
				)}
				{property?.reviews && property?.reviews.length > 0 && <Reviews reviews={property?.reviews} />}
			</div>
		</div>
	);
};

export default PropertyDetailPage;
