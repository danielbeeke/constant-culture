import { Map } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { enableContour, exportContourToSVGPaths } from './contour'
import { createSvg } from './createSvg'
import { enableDraw } from './draw'
import { enableGeocoder } from './geocoder'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import './style.scss'

export default function CreateDocument() {
  const mapWrapperReference = useRef<HTMLDivElement & { map?: Map }>(null)

  useEffect(() => {
    const element = mapWrapperReference.current
    if (!element || element.map) return

    const map = (element.map = new Map({
      container: mapWrapperReference.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=' + __MAPTILER__,
    }))

    enableDraw(map)
    enableGeocoder(map)
    map.on('load', () => enableContour(map))
  }, [mapWrapperReference])

  return (
    <div className="create-document">
      <div className="create-document-map" ref={mapWrapperReference}></div>
      <button
        onClick={() => {
          const map = mapWrapperReference.current!.map!
          const bounds = map.getBounds()

          const svg = createSvg({
            viewBox: {
              left: bounds.getWest(),
              bottom: bounds.getSouth(),
              right: bounds.getEast(),
              top: bounds.getNorth(),
            },
            contourPaths: exportContourToSVGPaths(map),
          })

          const blob = new Blob([svg], {
            type: 'text/svg',
          })

          const blobUrl = URL.createObjectURL(blob)

          console.log(blobUrl)
        }}
      >
        Save
      </button>
    </div>
  )
}
