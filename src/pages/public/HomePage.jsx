import React, { useEffect, useState } from "react";
import placeholderImage from "/placeholder.jpg"; // Import your placeholder image
import { Link, useLocation } from "react-router-dom";
import Container from "../../components/Container";
import PropertyCard from "../../components/common/PropertyCard";
import { axiosPrivate } from "../../services/axios.service";
import Loader from "../../components/common/Loader";
import Categories from "../../components/common/Categories";
import VenueSearch from "../../components/navbar/Search";
import venue from "/venue2.png";
const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTags, setPropertyTags] = useState(""); // Add state for propertyTags
  const location = useLocation();
  const showImage = location.pathname === "/";

  useEffect(() => {
    if (selectedCity) {
      getProperties({ city: selectedCity, propertyTags, query: searchQuery });
    }
  }, [selectedCity, propertyTags, searchQuery]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (searchQuery) {
          getProperties({
            city: selectedCity,
            search: searchQuery,
            propertyTags,
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCity, searchQuery, propertyTags]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    console.log("handleCitySelect", city);
  };

  const handleSearchVenues = (query) => {
    console.log("query", query);
    setSearchQuery(query);
    console.log("handleSearchVenues", query);
  };

  const handlePropertyTagSelect = (tag) => {
    setPropertyTags(tag);
  };

  async function getProperties(params) {
    try {
      setLoading(true);
      console.log("params: ", params);
      const { data } = await axiosPrivate.get("/property", { params });
      setProperties(data.data);
    } catch (error) {
      console.log("GET", error);
    } finally {
      setLoading(false);
    }
  }

  // if (loading) {
  // 	return <Loader />;
  // }

  return (
    <>
      {showImage && (
        <>
          <div className="relative">
            <img
              src={venue}
              alt="venue"
              className="h-[350px] w-full opacity-80 object-cover object-center"
            />
            <div className="absolute top-[calc(-50%_+_350px)] left-1/2 transform -translate-x-1/2">
              <VenueSearch
                onCitySelect={handleCitySelect}
                onSearchVenues={handleSearchVenues}
              />
            </div>
          </div>
        </>
      )}
      <Categories onPropertyTagSelect={handlePropertyTagSelect} />

      {loading ? (
        <Loader />
      ) : (
        <div className="sm:mx-2 lg:mx-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {properties?.map((property) => (
              <Link key={property.id} to={`/property-detail/${property.id}`}>
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
