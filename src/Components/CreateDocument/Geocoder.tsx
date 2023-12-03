import '@maptiler/geocoding-control/style.css'
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl'
import { Map } from 'maplibre-gl'
import { useMountOnce } from '../../hooks/useMountOnce'

export default function Geocoder({ map }: { map: Map }) {
  useMountOnce(() => {
    const geocoder = new GeocodingControl({
      apiKey: __MAPTILER__,
      limit: 1,
    })
    map.addControl(geocoder)

    map.on('load', () => {
      geocoder.setQuery('Grunnergasse 2 Stockerau 2000, Austria')
    })
  })

  return null
}
