import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ncMap from './data/nc-map.json'
import ncCities from './data/nc-cities.json'
import ncCounties from './data/nc-counties.json'
import { Map } from './components/map'

const FCC_GEO_API = {
    area: `https://geo.fcc.gov/api/census/area`,
    find: `https://geo.fcc.gov/api/census/block/find`,
}

function App() {
    const [countyData, setCountyData] = useState([])

    useEffect(() => {
        const requests = ncCities.map(({ id, name, lat, lon }) => 
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
        Promise.all(requests)
            .then(responses => responses.map(({ data }) => data.County.name.toUpperCase()))
            .then(counties => {
                const data = {}
                counties.forEach(county => {
                    if (data.hasOwnProperty(county)) {
                        data[county] += 1
                    } else {
                        data[county] = 1
                    }
                })
                const objects = Object.keys(data).map(key => ({ id: key, value: data[key] }))
                setCountyData(objects)
            })
    }, [])
    
    useEffect(() => {
        console.table(countyData)
    }, [countyData])

    return (
        <div className="App">
            <Map features={ ncMap.features } data={ countyData } height="600px" />
        </div>
    )
}

export default App
