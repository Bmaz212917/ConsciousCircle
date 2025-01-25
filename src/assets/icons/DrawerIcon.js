import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DrawerIcon(props) {
  return (
    <Svg
      width={25}
      height={20}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 1.6A1.2 1.2 0 011.7.4h21.6a1.2 1.2 0 010 2.4H1.7A1.2 1.2 0 01.5 1.6zm0 8.4a1.2 1.2 0 011.2-1.2h15.6a1.2 1.2 0 010 2.4H1.7A1.2 1.2 0 01.5 10zm1.2 7.2a1.2 1.2 0 000 2.4h21.6a1.2 1.2 0 100-2.4H1.7z"
        fill="#000"
        opacity={0.94}
      />
    </Svg>
  );
}

export default DrawerIcon;
