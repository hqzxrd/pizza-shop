import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, CartPizza } from "../../redux/slices/cartSlice";

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

type ItemsFind = {
  id: number;
  type: string;
  size: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
}) => {
  const [pizzaType, setPizzaType] = useState<number>(0);
  const [pizzaSize, setPizzaSize] = useState<number>(0);
  const typesName = [`Тонкая`, `Традиционная`];

  const dispatch = useDispatch();
  const { pizzas } = useSelector((state: any) => state.cartSlice);

  const thisItem: CartPizza = {
    id,
    imageUrl,
    title,
    price,
    type: typesName[pizzaType],
    size: sizes[pizzaSize],
    count: 0,
  };

  const item = pizzas.find(
    (obj: ItemsFind) =>
      obj.id === thisItem.id &&
      obj.type === thisItem.type &&
      obj.size === thisItem.size
  );

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setPizzaType(type)}
                  className={pizzaType === type ? `active` : ``}
                >
                  {typesName[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setPizzaSize(i)}
                  className={pizzaSize === i ? `active` : ``}
                >{`${size} см.`}</li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{`от ${price} ₽`}</div>
          <div
            onClick={() => dispatch(addProduct(thisItem))}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {item && <i>{item.count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
