import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type FilterValue =
  | string
  | number
  | boolean
  | [number | null, number | null]
  | [Date | null, Date | null]
  | null
  | undefined;

interface FilterState {
  [key: string]: FilterValue;
}

export type FilterContextType = {
  filterState: FilterState;
  setFilterValue: (key: string, value: FilterValue) => void;
  getFilterValue: <T extends FilterValue>(key: string) => T | null;
  setFilterState: (newState: Partial<FilterState>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  resetSpecificFilters: (keys: string[]) => void;
  hasActiveFilters: () => boolean;
  getActiveFiltersCount: () => number;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterState, setFilterState] = useState<FilterState>({});

  const setFilterValue = (key: string, value: FilterValue) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFilterValue = <T extends FilterValue>(key: string): T | null => {
    return (filterState[key] ?? null) as T;
  };

  const updateFilterState = (newState: Partial<FilterState>) => {
    setFilterState((prev) => {
      const updatedState = { ...prev };
      Object.entries(newState).forEach(([key, value]) => {
        if (value !== undefined) {
          updatedState[key] = value;
        }
      });
      return updatedState;
    });
  };

  const applyFilters = useCallback(() => {
    console.log("Applying filters:", filterState);
  }, [filterState]);

  const resetFilters = useCallback(() => {
    setFilterState({});
  }, []);

  const resetSpecificFilters = useCallback((keys: string[]) => {
    setFilterState((prev) => {
      const newState = { ...prev };
      keys.forEach((key) => delete newState[key]);
      return newState;
    });
  }, []);

  const hasActiveFilters = () => {
    return Object.entries(filterState).some(([, value]) => {
      if (Array.isArray(value)) {
        return value.some((item) => item !== null);
      }
      return Boolean(value);
    });
  };

  const getActiveFiltersCount = useCallback(() => {
    let count = 0;

    Object.values(filterState).forEach((value) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        if (value.some((item) => item !== null && item !== undefined)) {
          count++;
        }
      } else if (typeof value === "boolean") {
        if (value === true) count++;
      } else if (typeof value === "object") {
        count++;
      } else {
        if (value) count++;
      }
    });

    return count;
  }, [filterState]);

  const value = {
    filterState,
    setFilterValue,
    getFilterValue,
    setFilterState: updateFilterState,
    applyFilters,
    resetFilters,
    resetSpecificFilters,
    hasActiveFilters,
    getActiveFiltersCount,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
