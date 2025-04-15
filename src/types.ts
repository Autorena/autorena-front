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
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  crossSize?: number;
  setCrossSize: (size: number) => void;
};

export type StoryType = {
  id: number;
  title: string;
  img: string;
};

export type StoryModalProps = {
  storiesData: Array<StoryType>;
  initialIndex: number;
  onClose: () => void;
};

export type CarCardType = {
  common: {
    id: string;
    photos: string[];
    title: string;
    description?: string;
    ads?: boolean;
  };
  rent_auto: {
    cost_per_day: number;
    taxi_possible: boolean;
    buy_option: boolean;
    year: number;
    color?: string;
    discount?: number;
    min_rental_period_days?: number;
  };
};

export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};
