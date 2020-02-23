import { useEffect, useState } from 'react';
import axios from 'axios'

const FCC_GEO_API = {
    area: `https://geo.fcc.gov/api/census/area`,
    find: `https://geo.fcc.gov/api/census/block/find`,
}

// coordinates = [{ lat: <lat>, lon: <lon> }, ...]
export const useFccGeoApi = (coordinates = []) => {
    const [geoData, setGeoData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const requests = coordinates.map(({ lat, lon }) => 
            axios.get(
                FCC_GEO_API.find,
                {
                    params: {
                        latitude: lat,
                        longitude: lon,
                        showall: 'false',
                        format: 'json',
                    }
                }
            )
        )
        const fetchGeoData = async () => {
            await Promise.all(requests)
                .then(responses => setGeoData(responses.map(({ data }) => data)))
                .then(setIsLoading(false))
                .catch(error => {
                    setError("An error occurred while fetching geo data.")
                    setIsLoading(false)
                })
        }
        fetchGeoData()
    }, [coordinates])
    
    return { geoData, isLoading, error }
}