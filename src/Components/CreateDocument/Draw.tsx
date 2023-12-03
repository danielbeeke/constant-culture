import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { IControl } from 'maplibre-gl'
/** @ts-expect-error upstream error in bbox */
import BBox from '@turf/bbox'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useMountOnce } from '../../hooks/useMountOnce'
import { MapWithExtras } from '.'
import { useEffect } from 'react'

const zoomToBase = (map: MapWithExtras) => {
  const featureCollection = map.draw!.getAll()

  if (featureCollection.features.length) {
    const bbox = BBox(featureCollection)
    map.fitBounds(bbox, {
      animate: false,
    })
  }
}

export default function Draw({
  map,
  svg,
  onCreate,
}: {
  map: MapWithExtras
  svg?: string
  onCreate: (map: MapWithExtras) => void
}) {
  useMountOnce(() => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    })

    map.addControl(draw as unknown as IControl)

    map.draw = draw

    map.on('draw.create', () => {
      zoomToBase(map)
      onCreate(map)
    })
  })

  useEffect(() => {
    let savedFeatures = []
    if (svg) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(svg, 'image/svg+xml')
      const base = doc.querySelector('#base')
      try {
        savedFeatures = JSON.parse(base?.getAttribute('data-shapes')?.replaceAll("'", '"') ?? '')
      } catch {
        console.log('error')
      }

      if (savedFeatures?.length) {
        for (const feature of savedFeatures) map.draw!.add(feature)
        zoomToBase(map)
      }
    }
  }, [svg, map])

  return null
}
