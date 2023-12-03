import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { IControl } from 'maplibre-gl'
/** @ts-expect-error upstream error in bbox */
import BBox from '@turf/bbox'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useMountOnce } from '../../hooks/useMountOnce'
import { MapWithExtras } from '.'

export default function Draw({
  map,
  onCreate,
}: {
  map: MapWithExtras
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
      const features = draw.getAll()
      const bbox = BBox(features)
      map.fitBounds(bbox)
      map.once('moveend', () => {
        onCreate(map)
      })
    })
  })

  return null
}
