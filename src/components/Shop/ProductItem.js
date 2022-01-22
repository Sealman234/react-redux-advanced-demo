import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { id, title, price, description } = props;

  const addToCartHandler = () => {
    // 新的物件總數
    const newTotalQuantity = cart.totalQuantity + 1;

    // 新的物件清單
    const updatedItems = cart.items.slice(); // Create a shallow copy via slice
    const existingItem = cart.items.find((item) => item.id === id);
    if (!existingItem) {
      // 第一層修改不影響原陣列
      updatedItems.push({
        id: id,
        name: title,
        price: price,
        quantity: 1,
        totalPrice: price,
      });
    } else {
      const updatedItem = { ...existingItem }; // Create a shallow copy via Spread Operator
      updatedItem.quantity += 1;
      updatedItem.totalPrice += price;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      );
      updatedItems[existingItemIndex] = updatedItem; // 第一層修改不影響原陣列
    }

    // 操作 Redux
    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    };
    dispatch(cartActions.replaceCart(newCart));

    // dispatch(
    //   cartActions.addItemToCart(
    //     // payload
    //     {
    //       id,
    //       title,
    //       price,
    //     }
    //   )
    // );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
