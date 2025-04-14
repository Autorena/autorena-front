/// <reference types="vite/client" />

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "swiper/css" {}
declare module "swiper/css/pagination" {}
declare module "swiper/css/autoplay" {}
declare module "swiper/css/effect-fade" {}
declare module "swiper/css/navigation" {}
