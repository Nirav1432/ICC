import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="40px"
      height="25px"
      viewBox="0 -0.5 21 21"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M61.9 258.01H45.1v-15.914h8.4v-1.99H43V260h21v-9.947h-2.1v7.958zm-12.6-8.06L59.631 240 64 244.115l-10.666 9.917H49.3v-4.082z"
        transform="translate(-99 -400) translate(56 160)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default SvgComponent
