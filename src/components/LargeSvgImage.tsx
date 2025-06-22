import React from "react";

interface LargeSvgImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LargeSvgImage: React.FC<LargeSvgImageProps> = ({
  src,
  alt = "",
  className,
  style,
}) => {
  return <img src={src} alt={alt} className={className} style={style} />;
};
