import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../../services/axios.service';
import { differenceInDays } from 'date-fns';
import Container from '../../components/Container';
import PropertyHead from '../../components/PropertyDetails/PropertyHead';
import PropertyDescriptions from '../../components/PropertyDetails/PropertyDescriptions';
import PropertyReservation from '../../components/PropertyDetails/PropertyReservation';

const PropertyDetailPage = () => {
	const [property, setProperty] = useState(null);
	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	const { id } = useParams();

	// const disabledDates = [
	// 	new Date('2024-04-15'),
	// 	new Date('2024-04-22'),
	// ];

	useEffect(() => {
		getProperty();
	}, []);

	async function getProperty() {
		try {
			const { data } = await axiosPrivate.get(`/property/${id}`);
			setProperty(data.data);
			console.log('GET ID', data);
		} catch (error) {
			console.log('GET', error);
		}
	}

	const [totalPrice, setTotalPrice] = useState(property?.price);


	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount && property?.price) {
				setTotalPrice(dayCount * property?.price);
			} else {
				setTotalPrice(property?.price);
			}
		}
	}, [dateRange, property?.price]);

	return (
		<div className='mt-20'>
			<Container>
				<div className="max-w-screen-lg mx-auto">
					<div className="flex flex-col gap-6">
						<PropertyHead
							propertyName={property?.propertyName}
							city={property?.city} country={property?.country}
							propertyImages={property?.propertyImages[0].imgUrl}
						/>
						<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
							<PropertyDescriptions
								ownerName={property?.owner?.firstName}
								avatar={property?.owner?.avatar}
								capacity={property?.capacity}
								description={property?.description}
							/>
							<div className="order-first mb-10 md:order-last md:col-span-3 shadow-2xl rounded-xl">
								<PropertyReservation
									price={property?.price}
									totalPrice={totalPrice}
									dateRange={dateRange}
									onChangeDate={(value) => setDateRange(value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PropertyDetailPage;
