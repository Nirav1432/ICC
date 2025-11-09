import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width={30}
    height={30} {...props}>
      <Path d="M6.505 8.853L3.861 6.209l-.707.707 3.356 3.356 5.346-5.421-.712-.702z" />
    </Svg>
  )
}

export default SvgComponent
