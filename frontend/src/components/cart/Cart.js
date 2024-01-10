import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
    addItemToCart,
    removeItemFromCart,
    updateCartQuantity,
} from "../../actions/cartAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    //function for remove items from the cart
    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    //function to increase the quantity of an item
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty.stock) return;
        dispatch(addItemToCart(id, newQty));
    };


    //function to decrease the quantity of an item
    const decreaseQty = (id, quantity) => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            dispatch(updateCartQuantity(id, newQty));
        }
    };


    //function to navigate  to the delivery item
    const checkoutHandler = () => {
        navigate("/delivery");
    };

    return (
        <>
            {/*conditional rendering based on cartItems */}
            {
                cartItems.length === 0 ? (
                    <h2 className='mt-5 '>Your Cart is empty</h2>
                ) : (
                    <>
                        {/* display no of items in the cart*/}
                        <h2 className='mt-5'>Your Cart:  <b>{cartItems.length} items</b></h2>

                        {/*cart items */}
                        <div className='row d-flex justify-content-between cartt'>
                            <div className='col-12 col-lg-8'>
                                {
                                    cartItems.map((item) => (
                                        <>
                                            <div className='cart-item' key={item.fooditem}>
                                                <div className='row'>
                                                    {/*display item iamges */}
                                                    <div className='col-4 col-lg-3'>
                                                        <img src={item.image} alt="items"
                                                            height="90"
                                                            width="115" />
                                                    </div>
                                                    {/*display item Name */}
                                                    <div className='col-5 col-lg-3'>
                                                        {item.name}
                                                    </div>
                                                    {/*display price of item */}
                                                    <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                                                        <p id='card_item_price'>
                                                            <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                                                            {item.price}
                                                        </p>
                                                    </div>

                                                    {/*quantity control */}
                                                    <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                                                        <div className='stockCounter d-inline'>
                                                            {/*Decrease qty button  */}
                                                            <span className='btn btn-danger minus' onClick={() => 
                                                            decreaseQty(item.fooditem,item.quantity)
                                                            }>-

                                                            </span>
                                                            {/*Display current quantity */}
                                                            <input type="number"
                                                            className='form-control count d-inline'
                                                            value={item.quantity}
                                                            readOnly />
                                                            {/*Increase quantity button */}
                                                            <span className='btn btn-primary plus'
                                                            onClick={() => 
                                                            increaseQty(item.fooditem,item.quantity,item.stock)}>+

                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/*Remove item button */}
                                                    <div className='col-4 col-lg-1 mt-4 mt-lg-0 '>
                                                        <i id='delete_cart_item'
                                                        className='fa fa-trash btn btn-danger '
                                                        onClick={() => removeCartItemHandler(item.fooditem)
                                                        }>

                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                            </div>

                            {/*order summary */}
                            <div className='col-12 col-lg-3 my-4'>
                                <div id='order_summary' >
                                    <h4>Order Summary</h4>
                                    <hr/>
                                    {/*Display subtotal */}
                                    <p>
                                        Subtotal:
                                        <span className='order-summary-values'>
                                            {cartItems.reduce((acc,item) => acc + Number(item.quantity),0)}
                                            (Units)
                                        </span>
                                    </p>
                                    {/*display total */}
                                    <p>
                                    Total:
                                    <span className='order-summary-values'>
                                        <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                        {
                                            cartItems.reduce(
                                                (acc,item) => acc + item.quantity * item.price,0
                                            ).toFixed(2)
                                        }
                                    </span>
                                    </p>
                                    <hr/>
                                    {/*Checkout button */}
                                    <button id='checkout_btn' className='btn btn-primary btn-block' 
                                    onClick={checkoutHandler}>
                                     Check Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    </>
                )
            }
        </>
    );
};

export default Cart;