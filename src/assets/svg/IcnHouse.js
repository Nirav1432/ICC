import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={43.495}
            height={44.193}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fill="#005baa"
                d="M16 6.6L8 1.4 6 2.7V1H4v3L0 6.6l1.9 2.7.1-.1V15h5v-4h2v4h5V9.2l.1.1L16 6.6zm-14.6.3L8 2.6l6.6 4.3-.7 1L8 4 2.1 7.9l-.7-1zM13 14h-3v-4H6v4H3V8.6l5-3.3 5 3.3V14z"
            />
        </Svg>
    )
}

export default SvgComponent
