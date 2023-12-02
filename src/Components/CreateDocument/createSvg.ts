export const createSvg = ({
  contourPaths,
  viewBox,
}: {
  contourPaths: string[]
  viewBox: { left: number; top: number; right: number; bottom: number }
}) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${Math.min(
      viewBox.left,
      viewBox.right,
    )} ${Math.min(viewBox.bottom, viewBox.top)} ${Math.max(viewBox.left, viewBox.right)} ${Math.max(
      viewBox.bottom,
      viewBox.top,
    )}">
    ${contourPaths.join('\n')}
    </svg>
  `

  return svg
}
