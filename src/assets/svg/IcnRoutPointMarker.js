import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function IcnRoutPointMarker(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}
    >
      <G
        data-name="Power Transformers"
        transform="translate(-569.549 -746.549)"
      >
        <G
          data-name="Ellipse 581"
          transform="translate(569.549 746.549)"
          fill="none"
          stroke="blue"
          strokeWidth={1}
        >
          <Circle cx={9.5} cy={9.5} r={9.5} stroke="none" />
          <Circle cx={9.5} cy={9.5} r={9} />
        </G>
        <Circle
          data-name="Ellipse 600"
          cx={4.5}
          cy={4.5}
          r={4.5}
          transform="translate(574.549 751.549)"
          fill="blue"
        />
      </G>
    </Svg>
  )
}

export default React.memo(IcnRoutPointMarker)
