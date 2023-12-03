import { FeatureCollection } from '@maptiler/geocoding-control/svelte/types.js'
/** @ts-expect-error upstream error in bbox-clip */
import bboxClip from '@turf/bbox-clip'
import { GeoJSON2SVG } from 'geojson2svg'
/** @ts-expect-error upstream error in bbox */
import Bbox from '@turf/bbox'
import { MapWithExtras } from '.'

export const exportContourToSVGPaths = (
  map: MapWithExtras,
  transform: ([x, y]: [number, number]) => [number, number],
) => {
  const features = map.querySourceFeatures('contourSourceFeet', {
    sourceLayer: 'contours',
  })

  const baseShape = map.draw!.getAll()
  const bounds = Bbox(baseShape)

  const clipped: FeatureCollection = {
    type: 'FeatureCollection',
    features: features.map((feature) => bboxClip(feature, bounds)),
  }

  const converter = new GeoJSON2SVG({
    viewportSize: { width: 1200, height: 900 },
    coordinateConverter: transform,
    output: 'path',
  })

  return converter
    .convert(clipped)
    .filter(Boolean)
    .map((d) => `<path d="${d}" fill="none" stroke="black" />`)
}
