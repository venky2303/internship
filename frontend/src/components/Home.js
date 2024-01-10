import React, { useEffect } from 'react';
import { getRestaurants,sortByRatings,sortByReviews,toggleVegOnly } from '../actions/restaurantAction';
import Restaurant from "../components/Restaurant";
import Loader from "../components/layouts/Loader";
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux";
import CountRestaurant from './CountRestaurant';
import { useParams } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const {keyword} =useParams();

    const { loading: restaurantsLoading,
        error: restaurantsError,
        restaurants,
        showVegOnly,
    } = useSelector((state) => state.restaurants);

    useEffect(() => {
        if (restaurantsError) {
            return alert.error(restaurantsError);
        }
        dispatch(getRestaurants(keyword));
    }, [dispatch, restaurantsError,keyword]);



const handlesortByRatings=() =>{
    dispatch(sortByRatings());
};

const handlesortByReviews=()=>{
    dispatch(sortByReviews());
};
 
const handletoggleVegOnly=()=>{
    dispatch(toggleVegOnly()); 
};


{/*sample test */ }
const imageStyle = {
    width: '169px',
    height: '181px',
    background: 'linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)',
    borderRadius: '60%',
    marginRight: '5px', 
    // Adjust spacing between images as needed
  };


    return (
        <>
               
  <div className='mt-4'>
  <div className='gap-4 '>
    <div className='scroll gx-5'>
    <img
      style={imageStyle}
      src="./images/1.jpg"
      alt="Placeholder 1"
    />
    <img
      style={imageStyle}
      src="./images/2.jpg"
      alt="Placeholder 2"
    />
    <img
      style={imageStyle}
      src="./images/3.jpg"
      alt="Placeholder 3"
    />
    <img
      style={imageStyle}
      src="./images/4.jpg"
      alt="Placeholder 4"
    />
    <img
      style={imageStyle}
      src="./images/5.jpg"
      alt="Placeholder 5"
    />
    <img
      style={imageStyle}
      src="./images/6.jpg"
      alt="Placeholder 6"
    />
  </div>
</div>
    </div>
   

        <CountRestaurant/>

            {restaurantsLoading ? (<Loader />
            ) : restaurantsError ? (
                <Message variant="danger">{restaurantsError}</Message>
            ) : (
                <>
                    <section >
                        <div className='sort'>
                            <button className='sort_veg p-3' onClick={handletoggleVegOnly}>
                                {showVegOnly ? "Show All" : "Pure Veg"}
                            </button>
                            <button className='sort_rev p-3' onClick={handlesortByReviews}> Sort By Reviews</button>
                            <button className='sort_rate p-3' onClick={handlesortByRatings}>Sort By Ratings</button>
                        </div>
                        <div className='row mt-4'>
                            {restaurants && restaurants.restaurants ? (restaurants.restaurants.map((restaurant) => 
                            !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                                <Restaurant key={restaurant._id} restaurant={restaurant} />
                            ):null
                            )
                            ) : (
                                <Message variant="info ">No Restaurants Found</Message>
                            )}
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default Home