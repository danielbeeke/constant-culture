import { renderSvg } from './renderSvg'
import { exportContourToSVGPaths } from './exportContourToSVGPaths'
import { exportBaseShapeToSVGPaths } from './exportBaseShapeToSVGPaths'
import { MapWithExtras } from '.'
/** @ts-expect-error upstream error in bbox */
import Bbox from '@turf/bbox'
import { LngLatBounds } from 'maplibre-gl'

export const createSvg = (map: MapWithExtras) => {
  const baseShape = map.draw!.getAll()
  const bounds = Bbox(baseShape)
  const mapboxBounds = new LngLatBounds(bounds)

  const tX = (number: number) => parseFloat((number - mapboxBounds.getNorth()).toPrecision(10))
  const tY = (number: number) => parseFloat((number - mapboxBounds.getWest()).toPrecision(10))

  const transform = ([x, y]: [number, number]): [number, number] => [tX(x), tY(y)]

  const viewBox = {
    left: tX(mapboxBounds.getWest()),
    bottom: tY(mapboxBounds.getSouth()),
    right: tX(mapboxBounds.getEast()),
    top: tY(mapboxBounds.getNorth()),
  }

  const svg = renderSvg({
    viewBox,
    baseShapePaths: exportBaseShapeToSVGPaths(map, transform),
    contourPaths: exportContourToSVGPaths(map, transform),
  })

  return svg
}
