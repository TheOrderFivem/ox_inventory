declare module '@fortawesome/react-fontawesome' {
  import { ComponentType } from 'react';

  export interface FontAwesomeIconProps {
    icon: any;
    className?: string;
    style?: React.CSSProperties;
    size?: string;
    color?: string;
  }

  export const FontAwesomeIcon: ComponentType<FontAwesomeIconProps>;
}

declare module '@fortawesome/free-solid-svg-icons' {
  export const faStar: any;
}

declare module '@fortawesome/fontawesome-svg-core' {
  export const library: any;
}
