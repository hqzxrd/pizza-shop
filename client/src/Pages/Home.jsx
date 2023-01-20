import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPizzaCount, setCurrentPage } from "../redux/slices/paginationSlice";

import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, sortType } = useSelector(
    (state) => state.filterSlice
  );
  const sortProperty = sort.property;
  const { currentPage } = useSelector((state) => state.paginationSlice);
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pizzasPerPage = 8;

  useEffect(() => {
    !searchValue && setIsLoading(true);
    const category = categoryId ? `&category=${categoryId}` : ``;
    const order = sortType ? `&_order=asc` : `&_order=desc`;
    const search = searchValue
      ? `&title_like=${autoTranslater(searchValue)}`
      : ``;

    axios
      .get(
        `http://localhost:12552/pizzas?_limit=${pizzasPerPage}&_page=${currentPage}&_sort=${sortProperty}${order}${category}${search}`
      )
      .then((res) => {
        const pizzaCount = res.headers[`x-total-count`];
        dispatch(setPizzaCount(pizzaCount));
        setPizzas(res.data);
        setIsLoading(false);
      });
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
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination />
    </>
  );
};

export default Home;
