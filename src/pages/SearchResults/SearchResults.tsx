import { useSearch } from "../../HOC/SearchContext";
import { Loader } from "../../ui-components/Loader/Loader";

export const SearchResults = () => {
  const { searchValue } = useSearch();
  return (
    <div className="container">
      <div style={{ height: "500px" }}>
        {searchValue ? (
          <p style={{ fontSize: "15px", fontWeight: "300", opacity: "0.7" }}>
            Результаты поиска: {searchValue}
          </p>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
