import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCircleXmark } from 'react-icons/fa6';
const ImageUpload = ({ onImagesChange, propertyImages }) => {
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			const newImages = acceptedFiles.map((file) => ({
				file,
				caption: '',
			}));

			// Combine new images with existing ones and limit to 5
			const combinedImages = [...propertyImages, ...newImages].slice(0, 5);

			onImagesChange(combinedImages);
		},
	});

	const handleCaptionChange = (index, value) => {
		const updatedImageData = [...propertyImages];
		updatedImageData[index].caption = value;
		onImagesChange(updatedImageData);
	};

	const removeImage = (index) => {
		const updatedImageData = propertyImages.filter((_, i) => i !== index);
		onImagesChange(updatedImageData);
	};

	return (
		<div className="mb-8">
			{propertyImages.length <= 4 && (
				<div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
					<input {...getInputProps()} />
					<div className="space-y-1 text-center">
						<p className="text-gray-600">Drag 'n' drop some images here, or click to select files</p>
					</div>
				</div>
			)}
			<ul className="mt-4 flex flex-wrap gap-4 justify-stretch">
				{propertyImages.map((item, index) => (
					<li key={index} className="relative border border-gray-300 rounded-md w-44">
						<div className="relative">
							<img
								src={item.file ? URL.createObjectURL(item.file) : item.imgUrl}
								alt="Property"
								className="block w-full h-24 md:h-32 object-cover rounded-t-md"
							/>
							<button
								type="button"
								className="absolute top-[-12px] right-[-12px] p-1 bg-white text-sm rounded-full"
								onClick={() => removeImage(index)}
							>
								<FaCircleXmark className="text-red-500 w-6 h-6" />
							</button>
						</div>
						<div className="px-4 py-2 bg-white bg-opacity-75 rounded-b-md">
							<input
								type="text"
								value={item.caption}
								onChange={(e) => handleCaptionChange(index, e.target.value)}
								placeholder="Caption"
								className="w-full bg-transparent focus:outline-none"
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ImageUpload;
