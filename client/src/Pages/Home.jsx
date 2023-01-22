import React, { useContext, useEffect } from "react";
import { SearchContext } from "../App";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/slices/paginationSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, sortType } = useSelector(
    (state) => state.filterSlice
  );
  const sortProperty = sort.property;
  const { currentPage } = useSelector((state) => state.paginationSlice);
  const { pizzas, status } = useSelector((state) => state.pizzasSlice);
  const { searchValue } = useContext(SearchContext);
  const pizzasPerPage = 8;

  async function getPizzas() {
    const category = categoryId ? `&category=${categoryId}` : ``;
    const order = sortType ? `&_order=asc` : `&_order=desc`;
    const search = searchValue
      ? `&title_like=${autoTranslater(searchValue)}`
      : ``;
    dispatch(
      fetchPizzas({
        category,
        sortProperty,
        order,
        search,
        currentPage,
        pizzasPerPage,
      })
    );
  }

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortProperty, sortType, currentPage, searchValue]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [categoryId, searchValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function autoTranslater(str) {
    str = str.toLowerCase();
    let replacer = {
      q: "й",
      w: "ц",
      e: "у",
      r: "к",
      t: "е",
      y: "н",
      u: "г",
      i: "ш",
      o: "щ",
      p: "з",
      "[": "х",
      "]": "ъ",
      a: "ф",
      s: "ы",
      d: "в",
      f: "а",
      g: "п",
      h: "р",
      j: "о",
      k: "л",
      l: "д",
      ";": "ж",
      "'": "э",
      z: "я",
      x: "ч",
      c: "с",
      v: "м",
      b: "и",
      n: "т",
      m: "ь",
      ",": "б",
      ".": "ю",
      "/": ".",
    };
    return str.replace(/[A-z/,.;\'\]\[]/g, function (letter) {
      return replacer[letter.toLowerCase()];
    });
  }

  const items = pizzas.map((obj) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  const skeletons = [...new Array(pizzasPerPage)].map((_, i) => {
    return <PizzaBlockSkeleton key={i} />;
  });

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === `loading` || status === `error` ? skeletons : items}
      </div>
      <Pagination />
    </>
  );
};

export default Home;
