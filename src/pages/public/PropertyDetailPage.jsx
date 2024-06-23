import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../../services/axios.service';
import { differenceInDays } from 'date-fns';
import Container from '../../components/Container';
import PropertyHead from '../../components/PropertyDetails/PropertyHead';
import PropertyDescriptions from '../../components/PropertyDetails/PropertyDescriptions';
import PropertyReservation from '../../components/PropertyDetails/PropertyReservation';
import Loader from '../../components/common/Loader';
import Reviews from '../../components/PropertyDetails/Reviews';
import UserReviews from '../../components/PropertyDetails/UserReviews';
import { CATEGORIES } from '../../constants/categories';
import { GoogleMap, MarkerF, StreetViewService, useJsApiLoader } from '@react-google-maps/api';
import customMarkerIcon from '/MapMarker2.png';
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const containerStyle = {
	width: '100%',
	height: '400px',
	borderRadius: '0.375rem',
};

const mapOptions = {
	// disableDefaultUI: true,
	// mapTypeControl: false,
	streetViewControl: false,
	styles: [
		{
			featureType: 'poi.park',
			stylers: [{ visibility: 'off' }], // Hide POI labels
		},
		{
			featureType: 'road',
			elementType: 'labels',
			stylers: [{ visibility: 'off' }], // Hide road labels
		},
		{
			featureType: 'administrative',
			elementType: 'geometry',
			stylers: [{ visibility: 'off' }], // Hide administrative borders
		},
		{
			featureType: 'poi.business',
			stylers: [{ visibility: 'off' }], // Hide business POIs
		},
		{
			featureType: 'transit',
			stylers: [{ visibility: 'off' }], // Hide transit lines and stations
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
						<PropertyReservation
							property={property}
							// price={property?.price}
							// propertyId={property?.id}
							// queryId={id}
							// totalPrice={totalPrice}
							// dateRange={dateRange}
							// onChangeDate={(value) => setDateRange(value)}
						/>
					</div>
				</div>
				<hr />
				{!isLoaded ? (
					<h1>Loading...</h1>
				) : property?.lat ? (
					<>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={{ lat: Number(property?.lat), lng: Number(property?.lng) }}
							zoom={16}
							options={mapOptions}
						>
							<MarkerF
								position={{ lat: Number(property?.lat), lng: Number(property?.lng) }}
								icon={{
									url: customMarkerIcon,
									// scaledSize: new window.google.maps.Size(40, 40), // size in pixels
									origin: new window.google.maps.Point(0, 0), // origin of the image
									anchor: new window.google.maps.Point(20, 40), // anchor point (bottom center)
								}}
							/>
						</GoogleMap>
						<hr />
					</>
				) : (
					<></>
				)}
				{property?.reviews && property?.reviews.length > 0 && <Reviews reviews={property?.reviews} />}
				{/* <Reviews reviews={property?.reviews} /> */}
			</div>
		</div>
	);
};

export default PropertyDetailPage;
