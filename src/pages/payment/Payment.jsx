import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { axiosPrivate } from '../../services/axios.service';
import { useParams } from 'react-router-dom';
import FormatPrice from '../../components/FormatPrice';
import Loader from '../../components/common/Loader';

const Payment = () => {
    const [loading, setLoading] = useState(null);
    const [property, setProperty] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getProperty();
    }, []);

    async function getProperty() {
        try {
            setLoading(true);
            const { data } = await axiosPrivate.get(`/property/3417ecd1-4ed2-4b0f-8a12-e056e8528e10`);
            setProperty(data.data);
            console.log('GET ID', data);
        } catch (error) {
            console.log('GET', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <div className='mt-10'>
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
                    <div className='col-span-4 flex flex-col'>
                        <h1 className="text-4xl font-bold">Confirm And Pay</h1>
                        <p className="mt-10 font-semibold text-2xl">Your Booking</p>
                        <p className="mt-6 font-semibold text-xl">Dates</p>
                        <div className='mt-2 mb-9 flex justify-between'>
                            <p className="text-lg">13-20 May</p>
                            <p className="text-lg font-semibold underline cursor-pointer">Edit</p>
                        </div>
                        <hr />
                        <p className="mt-10 mb-10 font-semibold text-2xl">Pay With</p>
                        <hr />
                        <div className='mt-10 mb-10'>
                            <p className="font-semibold text-2xl">Required for your trip</p>
                            <div className='flex justify-between'>
                                <p className="mt-1 font-semibold text-xl">Phone number</p>
                                <button className='rounded-md p-2 bg-white border font-semibold'>Add</button>
                            </div>
                        </div>
                        <hr />
                        <div className='mt-10 mb-10'>
                            <p className="font-semibold text-2xl">Cancellation policy</p>
                            <span>Free cancellation for 48 hours. Cancel before 6 May for a partial refund.</span>
                            <p className=' underline font-bold'>Learn More</p>
                        </div>
                        <hr />
                        <div className='mt-10 mb-10'>
                            <p className="font-semibold text-2xl">Ground rules</p>
                            <span>We ask every guest to remember a few simple things about what makes a great guest.</span>
                            <p className='font-bold'>1. Treat your Host’s home like your own</p>
                            <p className='font-bold'>
                                2. Follow the house rules
                            </p>
                        </div>
                        <hr />
                        <div className='mt-10 mb-10'>
                            <button className='text-3xl px-4 py-2 rounded-md bg-primary text-white'>
                                Confirm and Pay
                            </button>
                        </div>

                    </div>
                    <div className="order-first mb-10 md:order-last md:col-span-3 sticky">
                        <div className="bg-white flex flex-col gap-8 rounded-xl shadow-lg border-[1px] p-4 border-neutral-200 overflow-hidden">
                            <div className="flex flex-row items-center mt-3">
                                <div className='flex gap-5 items-center'>
                                    <img src={property?.propertyImages[0].imgUrl} alt="" className='rounded-md w-[100px] h-[100px]' />
                                    <div className='font-semibold text-2xl'>
                                        {property?.propertyName}
                                        <div className='flex items-center text-base'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-4 w-4 mr-1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            4.90 (21 Review)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='flex flex-col'>
                                <p className="font-semibold text-2xl">Price Details</p>
                                <div className='flex justify-between'>
                                    <div>
                                        <FormatPrice price={50000} />
                                        <span> x 3 Nights</span>
                                    </div>
                                    <div>
                                        <FormatPrice price={150000} />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p className="font-semibold text-2xl">Total</p>
                                <div className="font-semibold text-2xl">
                                    <FormatPrice price={150000} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Payment