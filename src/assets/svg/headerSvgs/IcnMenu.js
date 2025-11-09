import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
const IcnMenu = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={46} height={48.875} {...props}>
    <G fill="#fff" transform="translate(15 18.062)">
      <Rect
        width={12.8}
        height={1.7}
        data-name="Rectangle 101"
        rx={0.85}
        transform="translate(3.2)"
      />
      <Rect
        width={16}
        height={1.7}
        data-name="Rectangle 102"
        rx={0.85}
        transform="translate(0 5.1)"
      />
      <Rect
        width={12.8}
        height={1.7}
        data-name="Rectangle 103"
        rx={0.85}
        transform="translate(0 10.2)"
      />
    </G>
  </Svg>
);
export default IcnMenu;
