export const renderSvg = ({
  contourPaths,
  viewBox,
  baseShapePaths,
}: {
  contourPaths: string[]
  viewBox: { left: number; top: number; right: number; bottom: number }
  baseShapePaths: string[]
}) => {
  const { left, top, right, bottom } = viewBox

  const svg = `
    <svg 
      viewBox="${left} ${top} ${right} ${bottom}"
      xmlns="http://www.w3.org/2000/svg">
      ${baseShapePaths.join('\n')}
      ${contourPaths.join('\n')}
    </svg>
  `

  return svg
}
