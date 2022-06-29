import { useState } from 'react';

function AddForm({ handlerAddItem }) {
  const [item, setItem] = useState();
  
  const handlerName = (e) => {
    const form = {...item, name: e.target.value};
    setItem(form);
  }
  const handlerQuantity = (e) => {
    const form = {...item, quantity: e.target.value};
    setItem(form);
  }
  const handlerPrice = (e) => {
    const form = {...item, price: e.target.value};
    setItem(form);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    handlerAddItem(item);
  }
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <input type='text' name='name' placeholder='Product name' onChange={handlerName} />
        <input type='text' name='quantity' placeholder='Quantity' onChange={handlerQuantity} />
        <input type='text' name='price' placeholder='Price' onChange={handlerPrice} />
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddForm