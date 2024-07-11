import * as React from "react";
import { SVGProps } from "react";

const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.36699 7.57575C9.24559 7.39251 9.10418 7.21863 8.94274 7.05719C8.1716 6.28606 7.11665 5.97173 6.11414 6.11421C5.42431 6.21225 4.75931 6.52658 4.22869 7.05719L3.28588 8C1.98413 9.30175 1.98413 11.4123 3.28588 12.714C4.58763 14.0158 6.69818 14.0158 7.99993 12.714L8.47133 12.2426M6.63286 8.42426C6.75426 8.60749 6.89568 8.78137 7.05712 8.94281C7.82825 9.71394 8.8832 10.0283 9.88572 9.88579C10.5755 9.78775 11.2405 9.47343 11.7712 8.94281L12.714 8C14.0157 6.69826 14.0157 4.5877 12.714 3.28596C11.4122 1.98421 9.30167 1.98421 7.99993 3.28596L7.52852 3.75736"
      stroke={props.color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LinkIcon;
