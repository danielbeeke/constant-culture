import MapElement from './Map'
import { useState } from 'react'
import { createSvg } from './createSvg'
import Draw from './Draw'
import Geocoder from './Geocoder'
import Contour from './Contour'
import './style.scss'
import { Map } from 'maplibre-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { fileOpen, directoryOpen, fileSave, supported } from 'browser-fs-access'

export type MapWithExtras = Map & { draw?: MapboxDraw }

export default function CreateDocument() {
  const [svg, setSvg] = useState('')

  return (
    <>
      <button
        onClick={async () => {
          const blob = await fileOpen({
            mimeTypes: ['image/svg+xml'],
          })

          const text = await blob.text()
          setSvg(text)
        }}
      >
        Load
      </button>
      <div className="create-document">
        <MapElement style={{ width: '50vw', height: '100vh' }}>
          {(map) => (
            <>
              <Contour map={map} svg={svg} />
              <Draw map={map} svg={svg} onCreate={() => setSvg(createSvg(map))} />
              <Geocoder map={map} svg={svg} />
            </>
          )}
        </MapElement>

        <div
          style={{ width: '50vw', height: '100vh' }}
          dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
      </div>
    </>
  )
}
