import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
    fill={"#fff"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      {...props}
    >
      <Path d="M2 5v2h20V5H2zm0 6v2h20v-2H2zm0 6v2h20v-2H2z" />
    </Svg>
  )
}

export default SvgComponent
