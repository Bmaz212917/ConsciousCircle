import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MeetingLinkIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.5 8.917v.668c0 2.67-.667 3.33-3.33 3.33H4.83c-2.662 0-3.33-.668-3.33-3.33V4.83c0-2.663.668-3.33 3.33-3.33H6M9 12.915V16.5M1.5 9.75h15M5.625 16.5h6.75"
        stroke="#444444"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.395 7.028h-3.57c-1.035 0-1.38-.69-1.38-1.38v-2.64c0-.825.675-1.5 1.5-1.5h3.45c.765 0 1.38.615 1.38 1.38v2.76c0 .765-.615 1.38-1.38 1.38zM15.682 5.94l-.907-.638v-2.07l.907-.637c.45-.308.818-.12.818.427V5.52c0 .547-.368.735-.818.42z"
        stroke="#444444"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MeetingLinkIcon;
