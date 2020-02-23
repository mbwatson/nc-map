import React, { useEffect, useState } from 'react'
import ncMap from './data/nc-map.json'
import ncCities from './data/nc-cities.json'
import styles from './app.module.css'
import { useFccGeoApi } from './hooks'
import { Map } from './components/map'
import { Note } from './components/note'

function App() {
    const { geoData, isLoading, error } = useFccGeoApi(ncCities)
    const [regionCounts, setRegionCounts] = useState({})
    
    useEffect(() => {
        // extract county names and put into format required for nivo map
        const counties = geoData.map(data => data.County.name.toUpperCase())
        const counts = { }
        counties.forEach(county => {
            if (counts.hasOwnProperty(county)) {
                counts[county] += 1
            } else {
                counts[county] = 1
            }
        })
        const objects = Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
        setRegionCounts(objects)
    }, [geoData])

    return (
        <div className={ styles.app }>
            { error && <Note>{ error }</Note>}
            { isLoading && <Note>Loading...</Note> }
            { !isLoading && !error && <Map features={ ncMap.features } data={ regionCounts } height="600px" /> }
        </div>
    )
}

export default App
