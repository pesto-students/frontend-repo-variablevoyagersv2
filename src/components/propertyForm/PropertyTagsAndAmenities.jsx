import React, { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import TextAreaField from '../forms/TextAreaField';
import TagButton from './TagButton';
import crossImage from '../../assets/icons/cross.png';
import Button from '../common/Button';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import WeddingIcon from '../../assets/icons/wedding.png';
import BirthdayIcon from '../../assets/icons/birthday.png';
import EngagementIcon from '../../assets/icons/engage.png';
import CorIcon from '../../assets/icons/cor-party.png';
import PoolIcon from '../../assets/icons/pool-party.png';
import CocktailIcon from '../../assets/icons/cocktail.png';
import BanquetIcon from '../../assets/icons/hall.png';
import RestaurantIcon from '../../assets/icons/res.png';
import FarmIcon from '../../assets/icons/farm.png';
import KittyIcon from '../../assets/icons/kitty.png';
const events = [
	{ title: 'Wedding', value: 'wedding', icon: WeddingIcon },
	{ title: 'Birthday', value: 'birthday', icon: BirthdayIcon },
	{ title: 'Engagement', value: 'engagement', icon: EngagementIcon },
	{ title: 'Pool Party', value: 'pool-party', icon: PoolIcon },
	{ title: 'Cocktail Party', value: 'cocktail-party', icon: CocktailIcon },
	{ title: 'Corporate Party', value: 'corporate-party', icon: CorIcon },
	{ title: 'Banquet Halls', value: 'banquet-halls', icon: BanquetIcon },
	{ title: 'Restaurants', value: 'restaurants', icon: RestaurantIcon },
	{ title: 'Farm Houses', value: 'farm-houses', icon: FarmIcon },
	{ title: 'Kitty Party', value: 'kitty-party', icon: KittyIcon },
];
const MAX_CATEGORIES = 3;
const MAX_AMENITIES = 5;
const PropertyTagsAndAmenities = ({ handleSetCategories, categories, catErr, handleAmenityChange, amenities }) => {
	const [amenityError, setAmenityError] = useState(false);
	const onSelectEvent = (eventValue) => {
		handleSetCategories(eventValue);
	};
	const handleRemoveAmenity = (index) => {
		const newAmenities = [...amenities];
		newAmenities.splice(index, 1);
		handleAmenityChange(newAmenities);
	};

	const handleAddInput = () => {
		if (amenities.length >= MAX_AMENITIES) {
			return;
		}
		const isEmptyInput = amenities.some((input) => !input.trim());
		if (isEmptyInput) {
			setAmenityError(true);
			return;
		}
		setAmenityError(false);

		handleAmenityChange([...amenities, '']);
	};

	const handleAmenityInputChange = (index, value) => {
		const newAmenities = [...amenities];
		newAmenities[index] = value;
		handleAmenityChange(newAmenities);
	};
	return (
		<div className="shadow sm:overflow-hidden sm:rounded-md">
			<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
				<div>
					<h3 className="text-base font-semibold leading-6 text-gray-900">Categories and Amenities</h3>
					<p className="mt-1 text-sm text-gray-500">Specify property category and list available amenities.</p>
				</div>
				<div>
					<div className="mb-2">
						<h3 className="block text-sm font-semibold text-gray-700">Categories</h3>
						<p className="text-sm text-gray-500">Select up to {MAX_CATEGORIES} categories that match your property.</p>
					</div>
					<div className="flex flex-1 w-100 flex-wrap gap-4">
						{events.map((event) => (
							<TagButton
								key={event.value}
								event={event}
								isSelected={categories.includes(event.value)}
								onSelectEvent={onSelectEvent}
								isDisabled={!categories.includes(event.value) && categories.length >= MAX_CATEGORIES}
							/>
						))}
					</div>
					{catErr && <p className="text-red-500 text-sm mt-1">At least one category is required.</p>}
				</div>

				<div>
					<h3 className="block text-sm font-semibold text-gray-700">Amenities</h3>
					<p className="mb-2 text-sm text-gray-500">Add up to {MAX_AMENITIES} available amenities in your property.</p>

					{amenities?.map((item, index) => (
						<div key={item.id} className="flex flex-1 w-100 gap-4 items-center">
							<input
								type="text"
								className="focus:ring-indigo-500 focus:outline-none focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								value={item}
								onChange={(e) => handleAmenityInputChange(index, e.target.value)}
							/>
							<FaXmark className="text-red-500 text-2xl cursor-pointer" onClick={() => handleRemoveAmenity(index)} />
						</div>
					))}
					{amenityError && <p className="text-red-500 text-sm mb-2">Please fill all existing amenity inputs before adding another.</p>}
					<Button
						buttonType="button"
						size="md"
						variant="filled"
						innerClass="w-40 bg-primary mt-2"
						innerTextClass="text-white"
						startIcon={<FaPlus />}
						onClick={handleAddInput}
					>
						Add amenity
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PropertyTagsAndAmenities;
