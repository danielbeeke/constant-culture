import { FeatureCollection } from '@maptiler/geocoding-control/svelte/types.js'
/** @ts-expect-error upstream error in bbox-clip */
import bboxClip from '@turf/bbox-clip'
import { GeoJSON2SVG } from 'geojson2svg'
import { MapWithExtras } from '.'

export const exportBaseShapeToSVGPaths = (
  map: MapWithExtras,
  transform: ([x, y]: [number, number]) => [number, number],
  width: number,
  height: number,
  viewBox: { left: number; top: number; right: number; bottom: number },
) => {
  const baseShape = map.draw!.getAll()
  const bounds = map.getBounds()

  const clipped: FeatureCollection = {
    type: 'FeatureCollection',
    features: baseShape.features.map((feature) => bboxClip(feature, bounds.toArray())),
  }

  const converter = new GeoJSON2SVG({
    mapExtent: viewBox,
    viewportSize: { width, height },
    coordinateConverter: transform,
    output: 'path',
  })

  return converter
    .convert(clipped)
    .filter(Boolean)
    .map((d) => `<path d="${d}" fill="none" stroke="red" />`)
}
