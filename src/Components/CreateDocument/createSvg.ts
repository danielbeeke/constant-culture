import { renderSvg } from './renderSvg'
import { exportContourToSVGPaths } from './exportContourToSVGPaths'
import { exportBaseShapeToSVGPaths } from './exportBaseShapeToSVGPaths'
import { MapWithExtras } from '.'
/** @ts-expect-error upstream error in bbox */
import Bbox from '@turf/bbox'
import { LngLatBounds } from 'maplibre-gl'
import { FeatureCollection, Polygon, GeoJsonProperties } from 'geojson'

export const createSvg = (map: MapWithExtras) => {
  const baseShape = map.draw!.getAll() as FeatureCollection<Polygon, GeoJsonProperties>
  const bounds = Bbox(baseShape)
  const mapboxBounds = new LngLatBounds(bounds)

  const tX = (number: number) => parseFloat((number - mapboxBounds.getWest()).toPrecision(10))
  const tY = (number: number) => parseFloat((number - mapboxBounds.getSouth()).toPrecision(10))

  const transform = ([x, y]: [number, number]): [number, number] => [tX(x), tY(y)]

  const ne = map.project(mapboxBounds._ne)
  const sw = map.project(mapboxBounds._sw)

  const width = ne.x - sw.x
  // TODO calculate this number instead of guessing.
  const height = (sw.y - ne.y) * 0.67

  const viewBox = {
    left: mapboxBounds.getWest(),
    right: mapboxBounds.getEast(),
    top: mapboxBounds.getNorth(),
    bottom: mapboxBounds.getSouth(),
  }

  const svg = renderSvg({
    width,
    height,
    baseShapePaths: exportBaseShapeToSVGPaths(map, transform, width, height, viewBox),
    contourPaths: exportContourToSVGPaths(map, transform, width, height, viewBox),
    baseShape,
  })

  return svg
}
