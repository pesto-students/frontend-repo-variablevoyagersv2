import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onImagesChange }) => {
	const [imageData, setImageData] = useState([]);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			const newImages = acceptedFiles.map((file) => ({
				file,
				caption: '',
			}));

			// Combine new images with existing ones and limit to 5
			const combinedImages = [...imageData, ...newImages].slice(0, 5);

			setImageData(combinedImages);
			onImagesChange(combinedImages);
		},
	});

	const handleCaptionChange = (index, value) => {
		const updatedImageData = [...imageData];
		updatedImageData[index].caption = value;
		setImageData(updatedImageData);
		onImagesChange(updatedImageData);
	};

	const removeImage = (index) => {
		const updatedImageData = imageData.filter((_, i) => i !== index);
		setImageData(updatedImageData);
		onImagesChange(updatedImageData);
	};

	return (
		<div className="mb-8">
			<label className="block text-sm font-medium text-gray-700">Property Images</label>
			{imageData.length <= 3 && (
				<div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
					<input {...getInputProps()} />
					<div className="space-y-1 text-center">
						<p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
					</div>
				</div>
			)}
			<ul className="mt-4 grid grid-cols-3 gap-4">
				{imageData.map((item, index) => (
					<li key={index} className="relative">
						<img src={URL.createObjectURL(item.file)} alt="Property" className="h-48 w-full object-cover rounded-lg" />
						<input
							type="text"
							value={item.caption}
							onChange={(e) => handleCaptionChange(index, e.target.value)}
							placeholder="Caption"
							className="absolute bottom-0 left-0 w-3xl px-2 py-1 bg-gray-800 bg-opacity-75 text-white"
						/>
						<button
							type="button"
							className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white text-sm rounded-bl-md"
							onClick={() => removeImage(index)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ImageUpload;
