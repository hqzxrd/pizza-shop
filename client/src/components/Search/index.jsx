import { useContext, useState, useCallback } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";

import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = useState(``);
  const { setSearchValue } = useContext(SearchContext);

  const debValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  function onChangeInput(str) {
    setValue(str);
    debValue(str);
  }

  return (
    <input
      value={value}
      onChange={(e) => onChangeInput(e.target.value)}
      className={styles.root}
      placeholder="Поиск пиццы..."
      type="text"
    />
  );
};

export default Search;
