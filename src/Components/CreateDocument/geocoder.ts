import '@maptiler/geocoding-control/style.css'
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl'
import { Map } from 'maplibre-gl'

export const enableGeocoder = (map: Map) => {
  const geocoder = new GeocodingControl({ apiKey: __MAPTILER__ })
  map.addControl(geocoder)
}
