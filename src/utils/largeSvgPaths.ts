export const LARGE_SVG_PATHS = {
  "location-icon": "assets/location-icon.svg",
  "profile-banner-2": "assets/profile-banner-2.svg",
  "long-term-lease": "assets/long-term-lease.svg",
  search: "assets/search.svg",
  filter_2: "assets/filter_2.svg",
  "filter_2-1": "assets/filter_2-1.svg",
  "no-auth": "assets/no-auth.svg",
  buyout: "assets/buyout.svg",
  "daily-rent": "assets/daily-rent.svg",
  filter_5: "assets/filter_5.svg",
  "driver-work": "assets/driver-work.svg",
  "car-large": "assets/car-large.svg",
  bail: "assets/bail.svg",
  filter_3: "assets/filter_3.svg",
  autoservices: "assets/autoservices.svg",
  filter_1: "assets/filter_1.svg",
  filter_4: "assets/filter_4.svg",
  option_6: "assets/option_6.svg",
  "location-icon-2": "assets/location-icon-2.svg",
  "profile-banner-1": "assets/profile-banner-1.svg",
  "logo-1": "assets/logo-1.svg",
  "no-favorites": "assets/no-favorites.svg",
  help: "assets/help.svg",
  "develop-img": "assets/develop-img.svg",
  bell: "assets/bell.svg",
} as const;

export const getLargeSvgPath = (name: keyof typeof LARGE_SVG_PATHS): string => {
  return LARGE_SVG_PATHS[name];
};
