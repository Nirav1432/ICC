import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
const IcnHeaderBack = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={props.width || 34} height={props.height || 34} {...props}>
    <G transform="translate(-301 -16)">
      <Circle
        cx={17}
        cy={17}
        r={17}
        fill="#fff"
        data-name="Ellipse 464"
        transform="translate(301 16)"
      />
      <G
        fill="none"
        stroke="#f58216"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M324.949 33.138h-12.484" data-name="Line 374" />
        <Path
          d="M317.138 38.276 312 33.138l5.138-5.139"
          data-name="Path 37880"
        />
      </G>
    </G>
  </Svg>
)
export default IcnHeaderBack;
