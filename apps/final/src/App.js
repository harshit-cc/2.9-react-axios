import { useState, useEffect } from 'react';
import Table from './components/Table';
import AddForm from './components/AddForm';

import './App.css';
import mockAPI from './api/mockapi';

function App() {
  const [products, setProducts] = useState([]);

  const apiGet = async () => {
    try {
      const response = await mockAPI.get(`/product/`);
      console.log(response.data);
      setProducts(response.data);    
    } catch (error) {
      console.log(error.message);
    }
  }
  const apiPost = async (newProduct) => {
    try {
      const response = await mockAPI.post(`/product`, newProduct)
      console.log(response.data);
      apiGet();
    } catch(error) {
      console.log(error.message);
    };
  }
  
  useEffect(() => {
    apiGet();
  }, [])

  return (
    <div className="App">
      <h1>Product List</h1>
      <button onClick={apiGet}>Load Products</button>
      <Table list={products} />
      <AddForm handlerAddItem={apiPost} />
    </div>
  );
}

export default App;
