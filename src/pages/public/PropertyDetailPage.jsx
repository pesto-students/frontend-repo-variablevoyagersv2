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
const PropertyDetailPage = () => {
	const [loading, setLoading] = useState(null);
	const [property, setProperty] = useState(null);
	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	const { id } = useParams();

	useEffect(() => {
		getProperty();
	}, []);

	async function getProperty() {
		try {
			setLoading(true);
			const { data } = await axiosPrivate.get(`/property/${id}`);
			setProperty(data.data);
			console.log('GET ID', data);
		} catch (error) {
			console.log('GET', error);
		} finally {
			setLoading(false);
		}
	}

	const [totalPrice, setTotalPrice] = useState(property?.price);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

			if (dayCount && property?.price) {
				setTotalPrice(dayCount * property?.price);
			} else {
				setTotalPrice(property?.price);
			}
		}
	}, [dateRange, property?.price]);
	if (loading) {
		return <Loader />;
	}

	return (
		<div className=" w-auto mx-16">
			<div className="flex flex-col gap-6">
				<PropertyHead
					propertyName={property?.propertyName}
					city={property?.city}
					country={property?.country}
					propertyImages={property?.propertyImages}
				/>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-1">
					<PropertyDescriptions
						ownerName={property?.owner?.firstName}
						avatar={property?.owner?.avatar}
						capacity={property?.capacity}
						description={property?.description}
						address={property?.address}
					/>
					<div className="order-first mb-10 md:order-last md:col-span-3">
						<PropertyReservation
							price={property?.price}
							totalPrice={totalPrice}
							dateRange={dateRange}
							onChangeDate={(value) => setDateRange(value)}
						/>
					</div>
				</div>
				<hr />
				<div className="text-lg font-light text-neutral-500">
					<h1 className='text-black font-bold mb-2'>What this place offers</h1>
					<div className='flex gap-10 items-center'>
						<ul>
							Event Facilities:
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
						</ul>
						<ul>
							Event Facilities:
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
						</ul>
						<ul>
							Event Facilities:
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
							<li className=' text-sm'>* Indoor and outdoor spaces</li>
						</ul>
					</div>
				</div>
				<hr />
				<Reviews />
				<UserReviews />
			</div>
		</div>
	);
};

export default PropertyDetailPage;
