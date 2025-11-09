import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"
const IcnCalendar = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={19.5} height={21.5} {...props}>
    <G
      fill="none"
      stroke="#f58216"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="translate(-2.25 -1.25)"
    >
      <Rect
        width={18}
        height={18}
        data-name="Rectangle 1574"
        rx={2}
        transform="translate(3 4)"
      />
      <Path d="M16 2v4" data-name="Line 389" />
      <Path d="M8 2v4" data-name="Line 390" />
      <Path d="M3 10h18" data-name="Line 391" />
    </G>
  </Svg>
)
export default IcnCalendar;
