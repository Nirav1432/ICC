import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 49.811 49.811"
      {...props}
    >
      <G
        data-name="Inspection Calls"
        transform="translate(148.75 109.75)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Circle
          data-name="Ellipse 681"
          cx={17.925}
          cy={17.925}
          r={17.925}
          transform="translate(-148 -109)"
        />
        <Path
          data-name="Rectangle 26079"
          transform="rotate(-45 -144.118 102.92)"
          d="M0 0H5.975V15.219H0z"
        />
        <Path
          data-name="Line 1071"
          transform="translate(-117.4 -78.399)"
          d="M4.525 4.525L0 0"
        />
        <Circle
          data-name="Ellipse 682"
          cx={11.95}
          cy={11.95}
          r={11.95}
          transform="translate(-142.025 -103.025)"
        />
        <Path
          data-name="Path 87986"
          d="M-136.05-91.075l4.481 4.481 7.469-7.469"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
