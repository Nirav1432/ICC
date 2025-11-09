import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={5}
      viewBox="0 0 25 5"
      {...props}
    >
      <Rect width={25} height={5} rx={2.5} fill="#29cc7f" />
    </Svg>
  )
}

export default SvgComponent
