import { renderSvg } from './renderSvg'
import { exportContourToSVGPaths } from './exportContourToSVGPaths'
import { exportBaseShapeToSVGPaths } from './exportBaseShapeToSVGPaths'
import { MapWithExtras } from '.'
/** @ts-expect-error upstream error in bbox */
import Bbox from '@turf/bbox'
import { LngLatBounds } from 'maplibre-gl'

export const createSvgBlobUrl = (map: MapWithExtras) => {
  const baseShape = map.draw!.getAll()
  const bounds = Bbox(baseShape)
  const mapboxBounds = new LngLatBounds(bounds)

  const viewBox = {
    left: mapboxBounds.getWest(),
    bottom: mapboxBounds.getSouth(),
    right: mapboxBounds.getEast(),
    top: mapboxBounds.getNorth(),
  }

  const svg = renderSvg({
    viewBox,
    baseShapePaths: exportBaseShapeToSVGPaths(map),
    contourPaths: exportContourToSVGPaths(map),
  })

  const blob = new Blob([svg], {
    type: 'image/svg+xml',
  })

  return URL.createObjectURL(blob)
}
