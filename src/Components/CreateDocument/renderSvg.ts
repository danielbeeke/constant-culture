import { FeatureCollection, Polygon, GeoJsonProperties } from 'geojson'

export const renderSvg = ({
  contourPaths,
  width,
  height,
  baseShapePaths,
  baseShape,
}: {
  width: number
  height: number
  contourPaths: string[]
  baseShapePaths: string[]
  baseShape: FeatureCollection<Polygon, GeoJsonProperties>
}) => {
  const shapes = JSON.stringify(baseShape.features).replaceAll('"', "'")

  const svg = `
    <svg 
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg">
      <g id="base" data-shapes="${shapes}">
      ${baseShapePaths.join('\n')}
      </g>
      <g id="contour">
      ${contourPaths.join('\n')}
      </g>
    </svg>
  `

  return svg
}
