import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

const Pagination: FC = () => {
  const dispatch = useDispatch();
  const { pizzasPerPage } = useSelector((state: any) => state.filterSlice);
  const { pizzaCount } = useSelector((state: any) => state.pizzasSlice);
  return (
    <div className={styles.placeholder}>
      {pizzaCount > 8 && (
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
          pageRangeDisplayed={pizzasPerPage}
          pageCount={Math.ceil(pizzaCount / pizzasPerPage)}
          previousLabel="<"
          renderOnZeroPageCount={undefined}
        />
      )}
    </div>
  );
};

export default Pagination;
