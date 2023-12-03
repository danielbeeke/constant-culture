import MapElement from './Map'
import { useState } from 'react'
import { createSvg } from './createSvg'
import Draw from './Draw'
import Geocoder from './Geocoder'
import Contour from './Contour'
import './style.scss'
import { Map } from 'maplibre-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { fileOpen, fileSave } from 'browser-fs-access'

export type MapWithExtras = Map & { draw?: MapboxDraw }

export default function CreateDocument() {
  const [svg, setSvg] = useState('')

  return (
    <>
      <div className="buttons">
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

        <button
          onClick={async () => {
            const blob = new Blob([svg], {
              type: 'image/svg+xml',
            })

            fileSave(blob, {
              fileName: 'Constant-Culture.svg',
              extensions: ['.svg'],
            })
          }}
        >
          Save
        </button>
      </div>

      <div className="create-document">
        <MapElement svg={svg} style={{ width: '50vw', height: '100vh' }}>
          {(map, svg) => (
            <>
              <Contour map={map} />
              <Draw map={map} svg={svg} onCreate={() => setSvg(createSvg(map))} />
              <Geocoder map={map} />
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
