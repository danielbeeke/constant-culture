import MapLibreGl, { Map } from 'maplibre-gl'
import MapLibreContour from 'maplibre-contour'
import { useMountOnce } from '../../hooks/useMountOnce'
const { DemSource } = MapLibreContour

const DEMUrl = `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${__MAPTILER__}`

const demSource = new DemSource({
  url: DEMUrl,
  encoding: 'mapbox',
  maxzoom: 13,
  worker: true,
})

/** @ts-expect-error upstream error in maplibre-contour */
demSource.setupMaplibre(MapLibreGl)

export default function Contour({ map }: { map: Map }) {
  useMountOnce(() => {
    map.on('load', () => {
      map.addSource('contourSourceFeet', {
        type: 'vector',
        tiles: [
          demSource.contourProtocolUrl({
            multiplier: 3.28084,
            overzoom: 1,
            thresholds: {
              11: [200, 1000],
              12: [100, 500],
              13: [100, 500],
              14: [50, 200],
              15: [20, 100],
              16: [10, 20],
              17: [1, 10],
            },
            elevationKey: 'ele',
            levelKey: 'level',
            contourLayer: 'contours',
          }),
        ],
        maxzoom: 30,
      })

      map.addLayer({
        id: 'contours',
        type: 'line',
        source: 'contourSourceFeet',
        'source-layer': 'contours',
        paint: {
          'line-opacity': 0.2,
          'line-width': ['match', ['get', 'level'], 1, 1, 0.5],
        },
      })

      map.addLayer({
        id: 'contour-text',
        type: 'symbol',
        source: 'contourSourceFeet',
        'source-layer': 'contours',
        filter: ['>', ['get', 'level'], 0],
        paint: {
          'text-halo-color': 'white',
          'text-halo-width': 1,
        },
        layout: {
          'symbol-placement': 'line',
          'text-size': 10,
          'text-field': ['concat', ['number-format', ['get', 'ele'], {}], "'"],
          'text-font': ['Noto Sans Bold'],
        },
      })
    })
  })

  return null
}
