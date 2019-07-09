import React from 'react';

const FormComponent = ({ state, onSubmit, onChange }) => {
    const { name, type, date_purchased, expire, price, where_purchased } = state;

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Name:
                    <input value={name} onChange={(e) => onChange(e)} />
                </label>
                <label>Type:
                    <input value={type} onChange={(e) => onChange(e)} />
                </label>
                <label>Date Purchased:
                    <input value={date_purchased} onChange={(e) => onChange(e)} />
                </label>
                <label>Expire:
                    <input value={expire} onChange={(e) => onChange(e)} />
                </label> 
                <label>Price:
                    <input value={price} onChange={(e) => onChange(e)} />
                </label>
                <label>Where Purchased:
                    <input value={where_purchased} onChange={(e) => onChange(e)} />
                </label> 
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default FormComponent;