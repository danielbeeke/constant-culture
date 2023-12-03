import MapElement from './Map'
import { useState } from 'react'
import { createSvg } from './createSvg'
import Draw from './Draw'
import Geocoder from './Geocoder'
import Contour from './Contour'
import './style.scss'
import { Map } from 'maplibre-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

export type MapWithExtras = Map & { draw?: MapboxDraw }

export default function CreateDocument() {
  const [svg, setSvg] = useState('')

  return (
    <div className="create-document">
      <MapElement style={{ width: '50vw', height: '100vh' }}>
        {(map) => (
          <>
            <Contour map={map} />
            <Draw map={map} onCreate={() => setSvg(createSvg(map))} />
            <Geocoder map={map} />
          </>
        )}
      </MapElement>

      <div
        style={{ width: '50vw', height: '100vh' }}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </div>
  )
}
