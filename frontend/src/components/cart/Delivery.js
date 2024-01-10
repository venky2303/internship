import React, { useState } from 'react';
import { countries } from 'countries-list';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryInfo } from '../../actions/cartAction';
import CheckoutSteps from './CheckoutSteps';

const Delivery = () => {
  const countriesList = Object.values(countries);
  const navigate = useNavigate();
  const { deliveryInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(deliveryInfo.address);
  const [city, setCity] = useState(deliveryInfo.city);
  const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode); // Fix variable name here
  const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);
  const [country, setCountry] = useState(deliveryInfo.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryInfo({ address, city, postalCode, phoneNo, country })); // Fix variable name here
    navigate('/confirm');
  };

  return (
    <>
      <CheckoutSteps delivery />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5 cartt delivery'>
          <form onSubmit={submitHandler} className='form'>
            <h1 className='mb-4'>Delivery Address</h1>
            <div className='form-group'>
              <div className='input-box'>
                <label htmlFor='address_field'>Address</label>
                <input
                  type='text'
                  id='address_field'
                  className='form_control'
                  value={address}
                  placeholder='Enter The Delivery Address'
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-box'>
                <label htmlFor='city_field'>City</label>
                <input
                  type='text'
                  id='city_field'
                  className='form_control'
                  value={city}
                  placeholder='Enter Your City'
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-box'>
                <label htmlFor='phone_field'>Phone No</label>
                <input
                  type='telephone'
                  id='phone_field'
                  className='form_control'
                  value={phoneNo}
                  placeholder='Enter Phone Number'
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-box'>
                <label htmlFor='postal_code_field'>Postal Code</label>
                <input
                  type='number'
                  id='postal_code_field'
                  className='form_control'
                  placeholder='Enter Your Postal Code'
                  value={postalCode} // Fix variable name here
                  onChange={(e) => setPostalCode(e.target.value)} // Fix variable name here
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='country_field'>Country</label>
              <div className='select-box'>
                <select
                  id='country_field'
                  className='form_control'
                  placeholder='Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              id='shipping_btn'
              type='submit'
              className='btn btn-block py-2'
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Delivery;
