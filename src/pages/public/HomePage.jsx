import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/common/PropertyCard';
import Loader from '../../components/common/Loader';
import Categories from '../../components/common/Categories';
import VenueSearch from '../../components/navbar/Search';
import venue from '/venue2.png';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { axiosPrivate } from '../../services/axios.service';
import { debounce, throttle } from '../../utils';
import { LuLoader2 } from 'react-icons/lu';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infintyLoader, setInfintyLoade] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectTag, setSelectTag] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const showImage = location.pathname === '/';
  const currentCity = useCurrentLocation();

  const handleScroll = useCallback(
    throttle(() => {
      if (loading) return;
      // setLoading(true); // Set loading to true immediately
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 2 >= scrollHeight && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 500),
    [hasMore, loading]
  );
  const throttledHandleScroll = throttle(handleScroll, 500);

  const handleSearchVenues = (query) => {
    setSearchQuery(query);
    resetAndFetchProperties(selectedCity, query);
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectTag("");
    setSearchQuery('')
  };
  const handleTagSelect = (tagName) => {
    setSelectTag(tagName);
  };

  useEffect(() => {
    if (currentCity && currentCity !== '') {
      setSelectedCity(currentCity);
      resetAndFetchProperties(currentCity);
    } else {
      resetAndFetchProperties();
    }
  }, [currentCity]);

  useEffect(() => {
    if (selectedCity || selectedCity === '') {
      setSearchQuery("")
      setSelectTag("")
      resetAndFetchProperties(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectTag || selectTag === '') {
      resetAndFetchProperties(selectTag);
    }
  }, [selectTag]);

  useEffect(() => {
    if (page > 1) {
      fetchMoreProperties(selectedCity);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  const resetAndFetchProperties = (city = null, search = searchQuery, Tag = selectTag) => {
    setProperties([]);
    setPage(1);
    setHasMore(true);
    fetchProperties(city, 1, search, Tag);
  };

  const fetchMoreProperties = (city = null, searchQuery = '') => {
    fetchProperties(city, page, searchQuery);
  };

  const fetchProperties = async (city = null, currentPage, search = searchQuery, Tag = selectTag) => {
    try {
      if (properties.length === 0)
        setLoading(true);

      setInfintyLoade(true);
      const params = {
        city: selectedCity,
        page: currentPage,
        limit: 8,
        search: search,
        propertyTags: Tag,
      };
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { data: { data } } = await axiosPrivate.get('/property', { params });

      if (currentPage === 1) {
        setProperties(data.properties);
      } else {
        setProperties((prevProperties) => [...prevProperties, ...data.properties]);
      }
      setHasMore(data.properties.length > 0);

    } catch (error) {
      console.log('GET', error);
    } finally {
      setLoading(false);
      setInfintyLoade(false);
    }
  };

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
        {properties?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {properties?.map((property) => (
                <Link key={property.id} to={`/property-detail/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
            {infintyLoader && (
              <div className="flex items-center justify-center space-x-2 mt-10">
                <LuLoader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="text-center my-10 h-20 flex justify-center items-center">
            <p className="text-xl text-gray-600">No properties found.</p>
          </div>
        )}
      </div>
      {
        loading && <div className='m-20 text-lg text-center'>Loading . . . .</div>
      }
    </>
  );
};

export default HomePage;