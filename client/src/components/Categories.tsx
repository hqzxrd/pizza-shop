import { FC } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Categories: FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: any) => state.filterSlice.categoryId);

  const categories = [
    `Все`,
    `Мясные`,
    `Вегетарианская`,
    `Гриль`,
    `Острые`,
    `Закрытые`,
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li
              key={i}
              onClick={() => dispatch(setCategoryId(i))}
              className={categoryId === i ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
