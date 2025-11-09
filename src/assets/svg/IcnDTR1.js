import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}
    >
      <Circle cx={9.5} cy={9.5} r={9.5} fill="#9264bf" />
    </Svg>
  )
}

export default SvgComponent
