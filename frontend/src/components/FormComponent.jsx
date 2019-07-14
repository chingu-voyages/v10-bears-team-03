import React from 'react';
import PropTypes from 'prop-types';

const FormComponent = ({ asset, onSubmit, onChange }) => {
    const { name, type, date_purchased, expire, price, where_purchased } = asset;

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name:
                        <input name="name" value={name} onChange={onChange} />
                    </label>
                </div>
                <div>
                    <label>Type:
                        <input name="type" value={type} onChange={onChange} />
                    </label>
                </div>
                <div>
                    <label>Date Purchased:
                        <input type="date" name="date_purchased" value={date_purchased} onChange={onChange} />
                    </label>
                </div>
                <div>
                    <label>Expire:
                        <input name="expire" value={expire} onChange={onChange} />
                    </label> 
                </div>
                <div>
                    <label>Price:
                        <input name="price" value={price} onChange={onChange} />
                    </label>
                </div>
                <div>
                    <label>Where Purchased:
                        <input name="where_purchased" value={where_purchased} onChange={onChange} />
                    </label> 
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

FormComponent.propTypes = {
    state: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
}

export default FormComponent;