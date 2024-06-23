import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/common/PropertyCard';
import Loader from '../../components/common/Loader';
import Categories from '../../components/common/Categories';
import VenueSearch from '../../components/navbar/Search';
import venue from '/venue2.png';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { axiosPrivate } from '../../services/axios.service';
import { throttle } from '../../utils';
import { LuLoader2 } from 'react-icons/lu';
import { PiBuildingsFill } from 'react-icons/pi';

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [internalLoading, setInternalLoading] = useState(false);
    const [infinityLoader, setInfinityLoader] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectTag, setSelectTag] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const showImage = location.pathname === '/';
    const currentCity = useCurrentLocation();

    const handleScroll = useCallback(throttle(() => {
        if (properties.length <= 7) return;

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight + 1 >= scrollHeight && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, 500), [properties.length, hasMore]);

    const handleSearchVenues = useCallback((query) => {
        setSearchQuery(query);
        resetAndFetchProperties(selectedCity, query, selectTag);
    }, [selectedCity, selectTag]);

    const handleCitySelect = useCallback((city) => {
        setSelectedCity(city);
        setSelectTag('');
        setSearchQuery('');
        resetAndFetchProperties(city, '', '');
    }, []);

    const handleTagSelect = useCallback((tagName) => {
        setSelectTag(tagName);
        resetAndFetchProperties(selectedCity, searchQuery, tagName);
    }, [selectedCity, searchQuery]);

    const resetAndFetchProperties = useCallback((city = null, search = '', tag = '') => {
        setInternalLoading(true);
        setProperties([]);
        setPage(1);
        setHasMore(true);
        fetchProperties(city, 1, search, tag);
    }, []);

    const fetchProperties = useCallback(async (city = null, currentPage = 1, search = '', tag = '') => {
        try {
            setInfinityLoader(true);
            const params = {
                city: city || selectedCity,
                page: currentPage,
                limit: 8,
                search,
                propertyTags: tag,
            };
            const { data: { data } } = await axiosPrivate.get('/property', { params });

            setProperties(prevProperties => 
                currentPage === 1 ? data.properties : [...prevProperties, ...data.properties]
            );
            setHasMore(data.properties.length > 0);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
            setInfinityLoader(false);
            setInternalLoading(false);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (currentCity && currentCity !== '') {
            setSelectedCity(currentCity);
            resetAndFetchProperties(currentCity);
        } else {
            resetAndFetchProperties();
        }
    }, [currentCity, resetAndFetchProperties]);

    useEffect(() => {
        if (page > 1) {
            fetchProperties(selectedCity, page, searchQuery, selectTag);
        }
    }, [page, selectedCity, searchQuery, selectTag, fetchProperties]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {showImage && (
                <div className="relative">
                    <img src={venue} alt="venue" className="h-[350px] w-full opacity-80 object-cover object-center" />
                    <div className="absolute top-[calc(-50%_+_350px)] left-1/2 transform -translate-x-1/2">
                        <VenueSearch onCitySelect={handleCitySelect} city={selectedCity} onSearchVenues={handleSearchVenues} search={searchQuery} />
                    </div>
                </div>
            )}
            <Categories setTag={handleTagSelect} selectedTag={selectTag} />
            <div className="sm:mx-2 lg:mx-16 px-4">
                {!internalLoading ? (
                    properties?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                {properties?.map((property) => (
                                    <Link key={property.id} to={`/property-detail/${property.id}`}>
                                        <PropertyCard property={property} />
                                    </Link>
                                ))}
                            </div>
                            {infinityLoader && (
                                <div className="flex items-center justify-center space-x-2 mt-10">
                                    <LuLoader2 className="w-8 h-8 text-primary animate-spin" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[40vh]">
                            <PiBuildingsFill className="w-16 h-16 text-black" />
                            <h3 className="mt-2 text-sm font-semibold text-black">Properties Not Found</h3>
                        </div>
                    )
                ) : (
                    <div className="flex items-center justify-center space-x-2 h-[40vh]">
                        <LuLoader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;