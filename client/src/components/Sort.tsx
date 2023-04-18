import { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSort, setSortType } from "../redux/slices/filterSlice";

type MenuItem = {
  name: string;
  property: `rating` | `price` | `title`;
};

const menu: MenuItem[] = [
  { name: `популярности`, property: `rating` },
  { name: `цене`, property: `price` },
  { name: `названию`, property: `title` },
];

const Sort: FC = () => {
  const dispatch = useDispatch();
  const { sort, sortType } = useSelector((state: any) => state.filterSlice);
  const [isVisible, setIsVisible] = useState(false);

  function sortClick() {
    setIsVisible(!isVisible);
  }

  return (
    <div className="sort" tabIndex={1} onBlur={() => setIsVisible(false)}>
      <div className="sort__label">
        {sortType ? (
          <div title="По возрастанию">
            <svg
              onClick={() => dispatch(setSortType(!sortType))}
              height="15px"
              width="15px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className="st0"
                d="M473.236,283.232L276.228,10.34C271.535,3.855,264.009,0,255.996,0c-8.013,0-15.539,3.855-20.222,10.34
		l-197,272.901c-4.975,7.692-4.78,17.622,0.497,25.1c5.277,7.478,14.546,11.022,23.464,8.938l96.465-22.53v184.81
		c-0.01,17.896,14.517,32.422,32.43,32.422l128.74,0.02c17.924-0.02,32.44-14.546,32.44-32.45V294.73l96.455,22.548
		c8.909,2.084,18.197-1.451,23.465-8.938C477.998,300.853,478.202,290.922,473.236,283.232z"
                fill="#303030"
              />
            </svg>
          </div>
        ) : (
          <div title="По убыванию">
            <svg
              onClick={() => dispatch(setSortType(!sortType))}
              height="15px"
              width="15px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className="st0"
                d="M472.729,203.658c-5.277-7.477-14.546-11.022-23.465-8.938L352.8,217.25V32.44
		c0.009-17.894-14.517-32.422-32.432-32.422L191.628,0c-17.924,0.019-32.44,14.546-32.44,32.44v184.83l-96.455-22.549
		c-8.908-2.084-18.196,1.442-23.464,8.938c-5.267,7.477-5.471,17.408-0.506,25.1l197.01,272.901
		c4.693,6.484,12.219,10.34,20.232,10.34s15.539-3.856,20.222-10.34l197-272.901C478.2,221.066,478.006,211.136,472.729,203.658z"
                fill="#303030"
              />
            </svg>
          </div>
        )}
        <div onClick={sortClick}>
          <b>По:</b>
          <span>{sort.name}</span>
        </div>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {menu.map((obj, i) => {
              console.log(obj);
              return (
                <li
                  onClick={() => {
                    dispatch(setSort(obj));
                    sortClick();
                  }}
                  className={sort.property === obj.property ? "active" : ""}
                  key={i}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
