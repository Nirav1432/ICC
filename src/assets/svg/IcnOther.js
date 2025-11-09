import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="#005baa"
      {...props}
    >
      <Path d="M0 0h48v48H0z" fill="none" />
      <Circle cx={24} cy={24} r={5} />
      <Circle cx={37} cy={24} r={5} />
      <Circle cx={11} cy={24} r={5} />
    </Svg>
  )
}

export default SvgComponent
