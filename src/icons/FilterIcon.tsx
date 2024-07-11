import * as React from "react";
import { SVGProps } from "react";

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 5H10"
      stroke={props.color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <path
      d="M14 11H6"
      stroke={props.color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <path
      d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
      stroke={props.color}
      strokeWidth={1.6}
    />
    <path
      d="M4 13C2.89543 13 2 12.1046 2 11C2 9.89543 2.89543 9 4 9C5.10457 9 6 9.89543 6 11C6 12.1046 5.10457 13 4 13Z"
      stroke={props.color}
      strokeWidth={1.6}
    />
  </svg>
);

export default FilterIcon;
