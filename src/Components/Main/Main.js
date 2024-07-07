import "./main.css";
import "../CustomList/CustomList.css";

import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a Context for the API data
const APIContext = createContext();

// Create a provider component
const APIProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        supplier: 'FragranceNet', // Hardcoded supplier
        ...filters,
      }).toString();
      const response = await fetch(`http://3.88.1.181:8000/products/public/catalog?${query}`);

      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      console.log(result);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <APIContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook to use the API data
const useAPI = () => {
  return useContext(APIContext);
};

// Component to display the data
const DataList = () => {
  const { data, loading, error } = useAPI();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
            <ul className="custom_list list_header">
                <li>
                    <input type="checkbox"/>
                </li>
                <li>
                    <p>S/N</p>
                </li>
                <li>
                    <p>Image</p>
                </li>
                <li>
                    <p>SKU</p>
                </li>
                <li>
                    <p>Name</p>
                </li>
                <li>
                    <p>Title</p>
                </li>
                <li>
                    <p>Description</p>
                </li>
                <li>
                    <p>Brand</p>
                </li>
                <li>
                    <p>Cost Price</p>
                </li>
                <li>
                    <p>Quantity</p>
                </li>
                <li>
                    <p>size</p>
                </li>
            </ul>
      {data.map((item) => (
        <div>
            <ul className="custom_list">
                <li>
                    <input type="checkbox"/>
                </li>
                <li>
                    <p>1</p>
                </li>
                <li>
                    <img src={item.Image_1} className="product_img"/>
                </li>
                <li>
                    <p>MG234567</p>
                </li>
                <li>
                    <p>Gloss</p>
                </li>
                <li>
                    <p>{item.Title}</p>
                </li>
                <li>
                    <p>{item.Description}</p>
                </li>
                <li>
                    <p>{item.Brand}</p>
                </li>
                <li>
                    <p>{item["Cost Price"]}</p>
                </li>
                <li>
                    <p>{item.Quantity}</p>
                </li>
                <li>
                    <p>{item.size}</p>
                </li>
            </ul>
        </div>
      ))}
    </div>
  );
};

// Component to handle search and filters
const SearchAndFilter = () => {
  const { fetchData } = useAPI();
  const [search, setSearch] = useState('');
  const [quantityGt, setQuantityGt] = useState('');
  const [costPriceLt, setCostPriceLt] = useState('');
  const [costPriceGte, setCostPriceGte] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {};
    if (search) filters['search_eq'] = search;
    if (quantityGt) filters['quantity_gt'] = quantityGt;
    if (costPriceLt) filters['costPrice_lt'] = costPriceLt;
    if (costPriceGte) filters['costPrice_gte'] = costPriceGte;
    fetchData(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <input type="number" placeholder="Quantity greater than" value={quantityGt} onChange={(e) => setQuantityGt(e.target.value)} />
      <input type="number" placeholder="Cost Price less than" value={costPriceLt} onChange={(e) => setCostPriceLt(e.target.value)} />
      <input type="text" placeholder="Cost Price greater than or equal to" value={costPriceGte} onChange={(e) => setCostPriceGte(e.target.value)} />
      <button type="submit">Filter</button>
    </form>
  );
};


function Main() {
    return(
        <APIProvider>
            <main className="main">
                <h3>Department List</h3>

                <div className="product_list_wrapper">
                    <DataList />
                </div>


                
                {/* <div>
                    <SearchAndFilter />
                </div> */}
            </main>
        </APIProvider>
    )
}

export default Main;