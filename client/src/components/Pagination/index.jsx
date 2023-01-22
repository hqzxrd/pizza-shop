import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/paginationSlice";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();
  const { pizzasPerPage } = useSelector((state) => state.paginationSlice);
  const { pizzaCount } = useSelector((state) => state.pizzasSlice);
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
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default Pagination;
