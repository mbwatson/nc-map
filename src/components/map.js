import React from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'

export const Map = ({ features, data, height = '300px' }) => {
    return (
        <div className="map" style={{ height: height, border: '10px solid #f99' }} >
            <ResponsiveChoropleth
                data={ data }
                features={ features }
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors="BrBG"
                domain={ [0, 5] }
                unknownColor="#f99"
                label="id"
                value="value"
                projectionTranslation={ [0.5, 0.5] }
                projectionRotation={ [79.7, -35.5, 0] }
                projectionScale={ 8000 }
                enableGraticule={ true }
                graticuleLineColor="#99f"
                borderWidth={ 1.0 }
                borderColor="#fff"
                legends={ [] }
                isInteractive={ true }
            />
        </div>
    )    
}