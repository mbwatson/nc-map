import React from 'react'
import ncMap from './data/nc-map.json'
import ncData from './data/nc-data.json'
import { NorthCarolinaMap } from './components/NcMap'

function App() {
    const randomData = ncData.map(({ id }) => {
        const randomValue = Math.floor(Math.random() * 500000 + 500000)
        return { id: id, value : randomValue }
    })

    return (
        <div className="App">
            <NorthCarolinaMap features={ ncMap.features } data={ randomData } height="600px" />
        </div>
    )
}

export default App
