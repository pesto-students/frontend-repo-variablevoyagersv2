import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/forms/InputField';
import ImageUpload from '../../components/forms/ImageUpload';
import TextAreaField from '../../components/forms/TextAreaField';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddPropertyPage = () => {
	const [propertyImages, setPropertyImages] = useState([]);

	const handleImagesChange = (images) => {
		setPropertyImages(images);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		let fd = new FormData();
		fd.append('propertyName', data.propertyName);
		fd.append('description', data.description);
		fd.append('capacity', data.capacity);
		fd.append('address', 'SampleAddress');
		fd.append('city', 'testCity');
		fd.append('country', 'India');
		fd.append('ownerId', 'f72de6e4-afad-4cb5-8c65-ec5e957272d3');
		propertyImages.forEach((f) => {
			fd.append(`propertyImages`, f.file);
			fd.append(`captions`, f.caption);
		});
		try {
			const res = await axios.post(`http://localhost:5050/api/v1/property`, fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (res.data.success) {
				reset();
				setPropertyImages([]);
				toast.success('Property is added');
			} else {
				toast.error('Something went wrong');
			}
		} catch (e) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="bg-white rounded-lg shadow-md mb-8">
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-2">Property Information</h2>
						<p className="text-gray-600 mb-4">Provide information about the property.</p>

						<div className="grid grid-cols-3 gap-4">
							<div>
								<InputField
									label="Property Name"
									id="propertyName"
									name="propertyName"
									register={register}
									required={true}
									error={errors?.propertyName}
								/>
								{errors.propertyName && <span className="text-red-500">This field is required</span>}
							</div>
							<div>
								<InputField label="Capacity" id="capacity" name="capacity" register={register} required={true} error={errors?.capacity} />
								{errors.capacity && <span className="text-red-500">This field is required</span>}
							</div>
							<div>
								<InputField label="Price" id="price" name="price" register={register} required={true} error={errors?.price} />
								{errors.price && <span className="text-red-500">This field is required</span>}
							</div>
						</div>
						<TextAreaField label="Description" id="description" name="description" register={register} required={true} />
						{errors.description && <span className="text-red-500">This field is required</span>}
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md mb-8">
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-2">Property Images</h2>
						<p className="text-gray-600 mb-4">Upload images of the property.</p>
						<ImageUpload onImagesChange={handleImagesChange} />
					</div>
				</div>

				<div className="flex justify-center">
					<button
						disabled={isSubmitting}
						type="submit"
						className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						{isSubmitting ? 'Loading' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddPropertyPage;
