import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { PiWarningCircle } from 'react-icons/pi';
import TextAreaField from '../forms/TextAreaField';
import Rating from 'react-rating';
import { RiStarFill } from 'react-icons/ri';
const ReviewModal = ({ onConfirm, onCancel, reviewLoading, reviewData }) => {
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		setValue,
		watch,
	} = useForm();
	const [rating, setRating] = useState(0);
	const [ratingErr, setRatingErr] = useState(false);

	useEffect(() => {
		if (reviewData?.rating) {
			setRating(reviewData.rating);
		}
		setValue('review', reviewData?.review);
	}, [reviewData, setValue]);
	const onSubmit = (data) => {
		if (!rating || rating === 0) {
			console.log('Error');
			setRatingErr(true);
			return;
		}
		setRatingErr(false);
		onConfirm(rating, data.review, 'add');
	};
	const onSubmitEdit = (data) => {
		if (!rating || rating === 0) {
			console.log('Error');
			setRatingErr(true);
			return;
		}
		setRatingErr(false);
		onConfirm(rating, data.review, 'edit', reviewData?.id);
	};
	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none ">
				<div className="fixed inset-0 bg-black opacity-50" onClick={onCancel}></div>
				<div className="relative z-10  bg-white rounded-lg shadow  max-w-md w-full m-4">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
						<h3 className="text-xl font-semibold text-gray-900">{reviewData?.review ? 'Edit Review' : 'Add Review'}</h3>
						<button
							type="button"
							onClick={onCancel}
							className="end-2.5 text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="p-4 md:p-5 mt-3">
						<div className="text-center mb-3">
							<Rating
								placeholderRating={rating}
								emptySymbol={<RiStarFill className={`w-8 h-8 mr-2 text-gray-200`} />}
								placeholderSymbol={<RiStarFill className={`w-8 h-8 text-yellow-500`} />}
								fullSymbol={<RiStarFill className={`w-8 h-8 text-yellow-500`} />}
								onChange={(rate) => setRating(rate)}
							/>
							{ratingErr && <span className="text-red-500 text-sm block">Rating is required</span>}
						</div>
						<TextAreaField
							label="Review"
							id="review"
							name="review"
							placeholder="Write your review"
							register={register}
							required={true}
							maxLength="250"
							watch={watch}
						/>
						{/* <h1>0/{review.length}</h1> */}
						{errors?.review && <span className="text-red-500 text-sm">Review is required</span>}
						<div className="flex justify-center items-center mt-5">
							<button
								disabled={reviewLoading}
								type="button"
								className={` text-white  focus:ring-4 focus:outline-none  border  font-medium  rounded-full text-sm inline-flex items-center px-8 py-2 w-32 text-center  justify-center ${
									reviewLoading ? 'cursor-not-allowed bg-gray-200' : 'bg-primary'
								}`}
								onClick={reviewData?.review ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmit)}
							>
								{reviewLoading ? <LuLoader2 className="w-6 h-6 text-white animate-spin" /> : 'Submit'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default ReviewModal;
