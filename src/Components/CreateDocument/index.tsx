import MapElement from './Map'
import { useState } from 'react'
import { createSvgBlobUrl } from './createSvgBlobUrl'
import Draw from './Draw'
import Geocoder from './Geocoder'
import Contour from './Contour'
import './style.scss'
import { Map } from 'maplibre-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

export type MapWithExtras = Map & { draw?: MapboxDraw }

export default function CreateDocument() {
  const [blobUrl, setBlobUrl] = useState('')

  return (
    <div className="create-document">
      <MapElement style={{ width: '50vw', height: '100vh' }}>
        {(map) => (
          <>
            <Contour map={map} />
            <Draw map={map} onCreate={() => setBlobUrl(createSvgBlobUrl(map))} />
            <Geocoder map={map} />
          </>
        )}
      </MapElement>

      <iframe src={blobUrl} style={{ width: '50vw', height: '100vh' }} />
    </div>
  )
}
