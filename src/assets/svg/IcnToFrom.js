import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={15}
      viewBox="0 0 8 11"
      {...props}
    >
      <Path
        data-name="Union 10"
        d="M-5784.308 8.412H-5788V2.588h3.691V0l4.309 5.5-4.309 5.5z"
        transform="translate(5787.999)"
        fill="#f58216"
      />
    </Svg>
  )
}

export default SvgComponent
