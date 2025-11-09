import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}
    >
      <Path d="M9.2 0L19 19H0z" fill="#c72a5f" />
    </Svg>
  )
}

export default SvgComponent
