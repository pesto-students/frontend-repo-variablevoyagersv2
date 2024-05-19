import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';
import useOutsideClick from '../../hooks/useOutsideClick';
const cityList = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Pune', 'Hyderabad'];
const PropertyAddress = () => {
	const {
		register,
		formState: { errors, isSubmitting },
	} = useFormContext();
	const [showDrop, setShowDrop] = useState(false);
	const [selectedCity, setSelectedCity] = useState('Delhi');
	const closeDrop = useCallback(() => {
		setShowDrop(false);
	}, []);

	const toggleDrop = (event) => {
		event.stopPropagation(); // Prevents event bubbling to body
		setShowDrop(!showDrop);
	};

	const handleDropClick = (event) => {
		event.stopPropagation(); // Prevents event bubbling to body
	};

	const dropRef = useOutsideClick(showDrop, closeDrop);
	return (
		<div className="shadow sm:overflow-hidden sm:rounded-md">
			<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
				<div>
					<h3 className="text-base font-semibold leading-6 text-gray-900">Location Information</h3>
					<p className="mt-1 text-sm text-gray-500">Enter the address and location details of the property.</p>
				</div>
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-6 sm:col-span-3">
						<div>
							<InputField label="Country" id="country" name="country" register={register} required={true} error={errors?.country} disabled={true} />
							{errors?.country && <span className="text-red-500 text-sm">Country is required</span>}
						</div>
					</div>
					<div className="col-span-6 sm:col-span-3">
						{/* <div>
							<InputField label="City" id="city" name="city" register={register} required={true} error={errors?.city} />
							{errors?.city && <span className="text-red-500 text-sm">City is required</span>}
						</div> */}
						<div>
							<label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">
								City
							</label>
							<div className="relative mt-1">
								<button
									type="button"
									className="relative w-full cursor-default  bg-white  py-2 px-3 rounded-md text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm "
									aria-haspopup="listbox"
									aria-expanded="true"
									aria-labelledby="listbox-label"
									onClick={toggleDrop}
								>
									<span className="block truncate">{selectedCity}</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path
												fillRule="evenodd"
												d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</button>

								{showDrop && (
									<ul
										ref={dropRef}
										className="absolute z-10 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
										tabIndex="-1"
										role="listbox"
										aria-labelledby="listbox-label"
										aria-activedescendant="listbox-option-3"
									>
										{cityList.map((c, idx) => (
											<li
												key={`${idx}-c`}
												className="text-gray-900 relative cursor-default select-none py-2 pl-8 pr-4 hover:bg-indigo-600 hover:text-white"
												id="listbox-option-0"
												role="option"
												onClick={() => setSelectedCity(c)}
											>
												<span className="font-normal block truncate">{c}</span>
												{selectedCity === c && (
													<span className="text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-1.5 hover:text-white">
														<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
															<path
																fillRule="evenodd"
																d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
																clipRule="evenodd"
															/>
														</svg>
													</span>
												)}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>

					<div className="col-span-6 sm:col-span-6">
						<TextAreaField label="Address" id="address" name="address" register={register} required={true} />
						{errors?.address && <span className="text-red-500 text-sm">Address is required</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyAddress;
