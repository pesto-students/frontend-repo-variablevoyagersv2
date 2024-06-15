import axios from "axios";
import { useEffect, useState } from "react";

export const useCurrentLocation = () => {
    const [currentLocation,setCurrentLocation] = useState("") 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
                // const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoibWVodWx2YWRnYW1hIiwiYSI6ImNseDIwcjJzMzA5ZmgyaXByaDk0bXptNnMifQ.VpVrZEBEj3sI3Wh83HJp3A`;
                const url = `https://api.mapbox.com/search/geocode/v6/reverse?country=in&types=district&longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoibWVodWx2YWRnYW1hIiwiYSI6ImNseDIwcjJzMzA5ZmgyaXByaDk0bXptNnMifQ.VpVrZEBEj3sI3Wh83HJp3A`;
                const { data: { features } } = await axios.get(url);
                // console.log(features);
                if (features.length > 0) {
                    const properties = features[0].properties;
                    const context = properties.context;
                    const city = context.district.name;
                    if (city) {
                        localStorage.setItem('currentLocation', city);
                        setCurrentLocation(city);
                       
                    }
                }
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }, []);
    return currentLocation;
};
