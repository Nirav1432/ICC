import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G data-name="57 Pop Up">
        <Path
          data-name="Path 54633"
          d="M21 2H7a1 1 0 00-1 1v3H3a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-3h3a1 1 0 001-1V3a1 1 0 00-1-1zm-5 18H4V8h2v9a1 1 0 001 1h9zm4-4H8V4h12zm-9-9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-2 0V8h-4a1 1 0 01-1-1z"
          fill="#f58216"
          transform="translate(-2 -2)"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
