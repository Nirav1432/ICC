import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19.655}
      height={20.093}
      viewBox="0 0 19.655 20.093"
      {...props}
    >
      <Path
        data-name="Path 54645"
        d="M20.423 3.251H5.732a2.486 2.486 0 00-1.887 4.1l5.807 6.773a1.445 1.445 0 01.337.91v6.335a1.955 1.955 0 00.932 1.674 2 2 0 001.033.292 1.869 1.869 0 00.876-.213L15.077 22a1.957 1.957 0 001.089-1.763v-5.215a1.4 1.4 0 01.337-.91L22.31 7.34a2.486 2.486 0 00-1.887-4.1zm.607 3l-5.807 6.773a3.067 3.067 0 00-.741 2.01v5.211a.258.258 0 01-.157.247l-2.246 1.123a.244.244 0 01-.27-.011.285.285 0 01-.135-.236v-6.335a3.067 3.067 0 00-.741-2.01L5.126 6.25a.8.8 0 01.607-1.314h14.69a.8.8 0 01.607 1.314z"
        transform="translate(-3.25 -3.24)"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
