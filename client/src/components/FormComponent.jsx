import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const FormComponent = ({
  asset,
  onSubmit,
  onChange,
  onDateChange,
  isUpdating
}) => {
  const { name, type, date_purchased, expire, price, where_purchased, distance_used} = asset;

  const [purchaseDateFocused, setPurchaseDateFocused] = useState(false);

  return (
    <div className='add-asset-form'>
      <h1>Enter new item:</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Brand name'
            required
          />
        </div>
        <div>
          <input
            name='type'
            value={type}
            onChange={onChange}
            placeholder='Type of item'
            required
          />
        </div>
        <div>
          <SingleDatePicker
            placeholder='Date Purchased'
            date={date_purchased} // momentPropTypes.momentObj or null
            onDateChange={onDateChange} // PropTypes.func.isRequired
            focused={purchaseDateFocused} // PropTypes.bool
            isOutsideRange={() => false}
            onFocusChange={({ focused }) => setPurchaseDateFocused(focused)} // PropTypes.func.isRequired
            block={true}
            numberOfMonths={1}
            readOnly={true}
            id='date_purchased' // PropTypes.string.isRequired,
          />
        </div>
        <div>
          <input
            type='number'
            name='expire'
            value={expire}
            onChange={onChange}
            placeholder='Expiration (number of months)'
            required
          />
        </div>
        <div>
          <input
            type='number'
            name='price'
            value={price}
            onChange={onChange}
            placeholder='Price'
          />
        </div>
        <div>
          <input
            type='number'
            name='distance_used'
            value={distance_used}
            onChange={onChange}
            placeholder='distance_used'
          />
        </div>
        <div>
          <input
            name='where_purchased'
            value={where_purchased}
            onChange={onChange}
            placeholder='Where Purchased'
          />
        </div>
        {isUpdating ? (
          <input type='submit' value='Update'/>
        ) : (
          <input className='submit-button' type='submit' value='Submit'/>
        )}
      </form>
    </div>
  );
};

FormComponent.propTypes = {
  state: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default FormComponent;
