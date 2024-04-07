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
import Button from '../../components/common/Button';
import { FaEye, FaPenToSquare, FaPlus, FaTrash } from 'react-icons/fa6';
import { RxEyeOpen, RxPencil2 } from 'react-icons/rx';
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
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Property</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the properties in your account.</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<Link to="/owner/add-property">
						<Button buttonType="button" size="md" variant="filled" innerClass="w-40 bg-white " innerTextClass="text-primary" startIcon={<FaPlus />}>
							Add Property
						</Button>
					</Link>
				</div>
			</div>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div className="flow-root">
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
																{/* <div className="mt-1 text-gray-500">{property.description}</div> */}
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
															<FaPenToSquare className="h-5 w-5 text-primary" />
														</a>
														<a href="#" className="text-indigo-600 hover:text-indigo-900">
															<FaTrash className="h-5 w-5 text-red-600" />
														</a>
														<a href="#" className="text-indigo-600 hover:text-indigo-900">
															<FaEye className="h-5 w-5 text-primary" />
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
			</div>
		</>
	);
};

export default PropertyPage;
