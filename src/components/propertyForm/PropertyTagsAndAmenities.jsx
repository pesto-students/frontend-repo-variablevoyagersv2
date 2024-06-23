import React, { useState } from 'react';
import TagButton from '../common/TagButton';
import Button from '../common/Button';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { CATEGORIES, MAX_AMENITIES, MAX_CATEGORIES } from '../../constants/categories';

const PropertyTagsAndAmenities = ({ handleSetCategories, categories, catErr, handleAmenityChange, amenities }) => {
	const [amenityError, setAmenityError] = useState(false);
	const onSelectEvent = (eventValue) => {
		let newSelectedEvents;
		if (categories.some((category) => category.tagName === eventValue)) {
			newSelectedEvents = categories.filter((category) => category.tagName !== eventValue);
		} else if (categories.length < MAX_CATEGORIES) {
			const selectedEvent = CATEGORIES.find((event) => event.tagName === eventValue);
			newSelectedEvents = [...categories, { id: selectedEvent.id, tagName: selectedEvent.tagName }];
		} else {
			newSelectedEvents = categories;
		}

		handleSetCategories(newSelectedEvents);
	};
	const handleAddInput = () => {
		if (amenities.length >= MAX_AMENITIES) {
			return;
		}
		const isEmptyInput = amenities.some((input) => !input.amenityName.trim());
		if (isEmptyInput) {
			setAmenityError(true);
			return;
		}
		setAmenityError(false);
		handleAmenityChange([...amenities, { amenityName: '' }]);
	};

	const handleAmenityInputChange = (index, value) => {
		const newAmenities = [...amenities];
		newAmenities[index] = { ...newAmenities[index], amenityName: value };
		handleAmenityChange(newAmenities);
	};

	const handleRemoveAmenity = (index) => {
		const newAmenities = amenities.filter((_, i) => i !== index);
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
						{CATEGORIES.slice(1).map((event) => (
							<TagButton
								key={event.tagName}
								event={event}
								isSelected={categories.some((category) => category.tagName === event.tagName)}
								onSelectEvent={onSelectEvent}
								isDisabled={!categories.some((category) => category.tagName === event.tagName) && categories.length >= MAX_CATEGORIES}
							/>
						))}
					</div>
					{catErr && <p className="text-red-500 text-sm mt-1">At least one category is required.</p>}
				</div>

				<div>
					<h3 className="block text-sm font-semibold text-gray-700">Amenities</h3>
					<p className="mb-2 text-sm text-gray-500">Add up to {MAX_AMENITIES} available amenities in your property.</p>

					{amenities?.map((item, index) => (
						<div key={index} className="flex flex-1 w-100 gap-4 items-center">
							<input
								type="text"
								className="focus:ring-indigo-500 focus:outline-none focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								value={item.amenityName}
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
						innerClass="w-44 bg-primary mt-2"
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
