import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      data-name="Inspection Reports"
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 49.356 48.28"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 26075"
            fill="none"
            stroke="#fff"
            strokeWidth={1.5}
            d="M0 0H49.112V48.28H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 73497">
        <G
          data-name="Group 73496"
          clipPath="url(#a)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            data-name="Path 87971"
            d="M37.861 36.724v5.047h-31.5V.538h23.08l8.42 8.311v4.566"
          />
          <Path
            data-name="Path 87972"
            d="M34.037 42.696v5.047H.537V6.51h5.824"
          />
          <Path data-name="Path 87973" d="M29.441.538v8.36h8.419" />
        </G>
      </G>
      <Path
        data-name="Line 1062"
        transform="translate(11.675 6.495)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M0 0L12.753 0"
      />
      <Path
        data-name="Line 1063"
        transform="translate(11.675 12.39)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M0 0L12.753 0"
      />
      <Path
        data-name="Line 1064"
        transform="translate(11.675 18.284)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M0 0L7.176 0"
      />
      <Path
        data-name="Path 87974"
        d="M11.558 25.357l2.5 2.5 4.377-4.377"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 87975"
        d="M11.558 33.606l2.5 2.5 4.377-4.377"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 87976"
        d="M31.52 24.586l3.894 3.894 6.823-6.823"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Circle
        data-name="Ellipse 679"
        cx={11.696}
        cy={11.696}
        r={11.696}
        transform="rotate(-89.856 30.99 5.76)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default SvgComponent
