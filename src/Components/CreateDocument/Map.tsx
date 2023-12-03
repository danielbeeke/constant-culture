import { Map } from 'maplibre-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MapWithExtras } from '.'

export default function CreateDocument({
  children,
  svg,
  ...props
}: Omit<JSX.IntrinsicElements['div'], 'children'> & {
  children: (map: MapWithExtras, svg: string) => ReactNode
  svg: string
}) {
  const mapWrapperReference = useRef<HTMLDivElement & { map?: MapWithExtras }>(null)

  const [renderedChildren, setRenderedChildren] = useState<ReactNode>(null)
  const [map, setMap] = useState<MapWithExtras>()

  useEffect(() => {
    if (map) {
      setRenderedChildren(children(map, svg))
    }
  }, [svg, children, map])

  useEffect(() => {
    const element = mapWrapperReference.current

    if (!element || element.map) return

    const map = (element.map = new Map({
      container: mapWrapperReference.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=' + __MAPTILER__,
    }))

    setMap(map)
  }, [mapWrapperReference, renderedChildren, children, svg])

  return (
    <div {...props} className="create-document-map" ref={mapWrapperReference}>
      {renderedChildren}
    </div>
  )
}
