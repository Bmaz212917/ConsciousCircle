import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SessionTimeIcon = ({width = 18, height = 18, stroke = '#444444'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.0004 1.50039V3.75039"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9996 1.50039V3.75039"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.2496 8.25038H11.2496"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.2496 11.25H8.9996"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 16.5004H6.75C3 16.5004 2.25 14.9554 2.25 11.8654V7.23789C2.25 3.71289 3.5025 2.76789 6 2.62539H12C14.4975 2.76039 15.75 3.71289 15.75 7.23789V12.0004"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.75 11.9996L11.25 16.4996V14.2496C11.25 12.7496 12 11.9996 13.5 11.9996H15.75Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SessionTimeIcon;
