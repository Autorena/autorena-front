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
    description: string;
    city: string;
    district: string;
    address: string;
    category: string;
    created_at: string;
    ads?: boolean;
    size?: string;
  };
  rent_auto: {
    cost_per_day: number;
    taxi_possible: boolean;
    buy_option: boolean;
    year: number;
    color?: string;
    discount?: number;
    min_rental_period_days: number;
    deposit_required: boolean;
  };
  search_auto?: {
    car_class: string;
    experience_years: number;
  };
  daily_rent: {
    cost_per_day: number;
    delivery_possible: boolean;
    deposit_required: boolean;
    buy_option: boolean;
  };
  driver_job?: {
    cost_per_day: number;
    buy_option: boolean;
  };
  auto_services?: {
    cost_per_day: number;
    buy_option: boolean;
  };
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
