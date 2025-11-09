import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IncFeederPillar(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M7 1H4L1 6v9h14V6l-3-5H9v5H7V1z" fill="#52f607ff" />
    </Svg>
  )
}

export default IncFeederPillar
