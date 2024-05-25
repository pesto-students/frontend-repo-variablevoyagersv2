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
const PropertyDetailPage = () => {
	const [loading, setLoading] = useState(null);
	const [property, setProperty] = useState(null);
	const [tags, setTags] = useState([]);

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
		<div className=" w-auto mx-20 mt-24	">
			<div className="flex flex-col gap-6">
				<PropertyHead
					propertyName={property?.propertyName}
					city={property?.city}
					country={property?.country}
					propertyImages={property?.propertyImages}
				/>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-36 mt-2">
					<PropertyDescriptions
						ownerName={property?.owner?.firstName}
						avatar={property?.owner?.avatar}
						capacity={property?.capacity}
						description={property?.description}
						address={property?.address}
						tags={tags}
						amenities={property?.amenities}
					/>
					<div className="order-first mb-10 md:order-last md:col-span-3">
						<PropertyReservation
							price={property?.price}
							propertyId={property?.id}
							queryId={id}
							// totalPrice={totalPrice}
							// dateRange={dateRange}
							// onChangeDate={(value) => setDateRange(value)}
						/>
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
