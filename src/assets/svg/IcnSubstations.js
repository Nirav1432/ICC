import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IcnSubstations(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 19 19"
      {...props}
    >
      <Path fill="#3b6cbf" d="M0 0H19V19H0z" />
    </Svg>
  )
}

export default React.memo(IcnSubstations)
