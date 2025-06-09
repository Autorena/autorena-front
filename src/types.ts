import { ReactNode } from "react";

export type Children = {
  children?: ReactNode;
};

export type ChildrenType = {
  children: React.ReactNode;
};

export type modalContextProps = {
  isModalActive: boolean;
  setModalActive: (active: boolean) => void;
  modalContent: React.ReactNode | null;
  setModalContent: (
    content: React.ReactNode,
    options?: {
      modalClass?: string;
      skipHistory?: boolean;
      isRootModal?: boolean;
    }
  ) => void;
  crossSize: number;
  setCrossSize: (size: number) => void;
  modalClass?: string;
  goBack?: () => void;
};

export type StorySlide = {
  background?: string;
  content: React.ReactNode;
};

export type StoryGroup = {
  id: number;
  img: string;
  title: string;
  slides: StorySlide[];
};

export type StoryModalProps = {
  storiesData: Array<StoryGroup>;
  initialIndex: number;
  onClose: () => void;
};

export type CarContent = {
  id: string;
  userId: string;
  brandId: string;
  modelId: string;
  yearOfCarProduction: number;
  fuelType: string;
  transmission: string;
  carBodyType: string;
  vehicleSegment: string;
  carOptions: {
    hasAirConditioning: boolean;
    hasChildSeat: boolean;
  };
  carCategory: string;
  color: string;
  photosUrl: string[];
  createdAt: string;
  updatedAt: string;
};

export type ListingOptions = {
  allowedForTaxi: boolean;
  allowedOnlyForPersonalUse: boolean;
  requireRussianCitizenship: boolean;
  buyoutPossible: boolean;
};

export type CarRentListing = {
  id: string;
  size?: string;
  ads?: boolean;
  carContent: CarContent;
  userId: string;
  listingOptions: ListingOptions;
  depositRequired: boolean;
  paymentPeriod: string[];
  pricePerDay: number;
  minimumRentalPeriod: number;
  additionalInfo: string;
  createdAt: string;
  updatedAt: string;
  city: string;
  rentDuration: string[];
};

export type CarSellListing = {
  id: string;
  carContent: CarContent;
  userId: string;
  listingOptions: ListingOptions;
  depositRequired: boolean;
  paymentPeriod: string[];
  price: number;
  additionalInfo: string;
  createdAt: string;
  updatedAt: string;
  city: string;
};

export type Listing = {
  id: string;
  size?: "large";
  ads?: boolean;
  carRentListing?: CarRentListing;
  carSellListing?: CarSellListing;
  carBuyListing?: CarRentListing;
  driverJobListing?: CarRentListing;
  autoServiceListing?: CarRentListing;
  wantedCarRentListing?: CarRentListing;
};

export type CarCardType = {
  listing: Listing;
};

export interface CarCardProps {
  carData: CarCardType;
}

export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export type RegFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
