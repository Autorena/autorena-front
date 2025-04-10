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
