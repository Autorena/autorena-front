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
    options?: { modalClass: string }
  ) => void;
  crossSize: number;
  setCrossSize: (size: number) => void;
  modalClass?: string;
  goBack?: () => void;
};

export type StoryType = {
  id: number;
  title: string;
  img: string;
  content?: ReactNode;
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
  search_auto?: {
    car_class: string;
  };
};

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
