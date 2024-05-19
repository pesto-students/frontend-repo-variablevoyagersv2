import React from 'react';
import { FaEllipsisVertical, FaEye, FaPenToSquare, FaTrash } from 'react-icons/fa6';

const MyBookings = () => {
	let arr = [1, 2, 3, 4, 5];
	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Your bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings in your account.</p>
				</div>
			</div>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div className="flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								{arr.length > 0 ? (
									<table className="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
													Property Name
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Event Date
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Date placed
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Total Amount
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Status
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{arr.map((ele, idx) => (
												<tr key={idx}>
													<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
														<div className="flex items-center">
															<div className="h-14 w-14 flex-shrink-0">
																<img
																	className="h-14 w-14 rounded-md"
																	src="https://ik.imagekit.io/venueBooking/property/propertyImages-1711808420083-957408833_Lo90KcTG6"
																	alt=""
																/>
															</div>

															<div className="ml-4">
																<div className="font-medium text-gray-900">Carnival ground</div>
																{/* <div className="mt-1 text-gray-500">{property.description}</div> */}
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">15 Apr 2024 - 24 Apr 2-24</td>
													<td className="whites pace-nowrap px-3 py-5 text-sm text-gray-500">10 Apr 2024</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<div className="text-gray-900">Rs.5000</div>
													</td>

													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
															Pending
														</span>
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<a href="#" className="text-indigo-600 hover:text-indigo-900 flex justify-center">
															<FaEllipsisVertical />
														</a>
 
													</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<h1>No book yet</h1>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyBookings;
