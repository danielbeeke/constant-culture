import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { IControl, Map } from 'maplibre-gl'

export const enableDraw = (map: Map) => {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  })

  map.addControl(draw as unknown as IControl)
}
