import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';
import { axiosPrivate } from '../../services/axios.service';
import Loader from '../../components/common/Loader';
import EditIcon from '../../assets/icons/edit.png';
import TrashIcon from '../../assets/icons/trash.png';
import EyeIcon from '../../assets/icons/eye.png';
import moment from 'moment';
const PropertyPage = () => {
	const [loading, setLoading] = useState(false);
	const [properties, setProperties] = useState([]);
	const user = useSelector(selectUser);
	useEffect(() => {
		getOwnerProperties();
	}, []);

	const getOwnerProperties = async () => {
		try {
			setLoading(true);
			const { data } = await axiosPrivate.get(`/property/owner-property/${user?.id}`);
			setProperties(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	if (loading) {
		return <Loader />;
	}
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Property</h1>
					<p className="mt-2 text-sm text-gray-700">A list of all the properties in your account.</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<Link to="/owner/add-property">
						<button
							type="button"
							className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Add Property
						</button>
					</Link>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						{properties.length > 0 ? (
							<table className="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
											Name
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Price
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Capacity
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Address
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Last update
										</th>
										<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{properties.map((property) => (
										<tr key={property.id}>
											<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
												<div className="flex items-center">
													<div className="h-14 w-14 flex-shrink-0">
														<img className="h-14 w-14 rounded-md" src={property.propertyImages[0].imgUrl} alt="" />
													</div>

													<div className="ml-4">
														<div className="font-medium text-gray-900">{property.propertyName}</div>
														<div className="mt-1 text-gray-500">{property.description}</div>
													</div>
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{property.price}</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{property.capacity}</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
												<div className="text-gray-900">{property.city}</div>
												<div className="mt-1 text-gray-500">{property.country}</div>
											</td>

											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{moment(property.updatedAt).format('MMMM Do YYYY')}</td>
											<td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex item-center justify-between">
												<a href="#" className="text-indigo-600 hover:text-indigo-900">
													<img className="h-6 w-6" src={EditIcon} alt="" />
												</a>
												<a href="#" className="text-indigo-600 hover:text-indigo-900">
													<img className="h-6 w-6" src={TrashIcon} alt="" />
												</a>
												<a href="#" className="text-indigo-600 hover:text-indigo-900">
													<img className="h-6 w-6" src={EyeIcon} alt="" />
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<h1>No property</h1>
						)}
					</div>
				</div>
			</div>
		</div>

		// <div classNameName="px-4 sm:px-6 lg:px-8">
		// 	<div classNameName="sm:flex sm:items-center">
		// 		<div classNameName="sm:flex-auto">
		// 			<h1 classNameName="text-base font-semibold leading-6 text-gray-900">Property</h1>
		// 			<p classNameName="mt-2 text-sm text-gray-700">A list of all the property in your account.</p>
		// 		</div>
		// 		<div classNameName="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
		// 			<Link to="/owner/add-property">
		// 				<button
		// 					type="button"
		// 					classNameName="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		// 				>
		// 					Add Property
		// 				</button>
		// 			</Link>
		// 		</div>
		// 	</div>
		// 	<div classNameName="mt-8 flow-root">
		// 		<div classNameName="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		// 			<div classNameName="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
		// 				{properties.length > 0 ? (
		// 					<table classNameName="min-w-full divide-y divide-gray-300">
		// 						<thead>
		// 							<tr>
		// 								<th scope="col" classNameName="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
		// 									Name
		// 								</th>
		// 								<th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
		// 									Capacity
		// 								</th>
		// 								<th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
		// 									Price
		// 								</th>
		// 								<th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
		// 									Address
		// 								</th>
		// 								<th scope="col" classNameName="relative py-3.5 pl-3 pr-4 sm:pr-0">
		// 									<span classNameName="sr-only">Edit</span>
		// 								</th>
		// 							</tr>
		// 						</thead>
		// 						<tbody classNameName="divide-y divide-gray-200">
		// 							{properties.map((property) => (
		// 								<tr key={property.id}>
		// 									<td classNameName="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{property.propertyName}</td>
		// 									<td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.capacity}</td>
		// 									<td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.price}</td>
		// 									<td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td>
		// 									<td classNameName="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
		// 										<a href="#" classNameName="text-indigo-600 hover:text-indigo-900">
		// 											Edit<span classNameName="sr-only">, Lindsay Walton</span>
		// 										</a>
		// 									</td>
		// 								</tr>
		// 							))}
		// 						</tbody>
		// 					</table>
		// 				) : (
		// 					<h1>No Proprty added yet</h1>
		// 				)}
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default PropertyPage;
