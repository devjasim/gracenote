import React, { useState, useEffect } from 'react';

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const fetchData = async () => {
    setLoading(true);
    await fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        return data;
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='grid grid-cols-12 gap-6'>
        {currentItems.map((item) => (
          <div key={item.id} className='col-span-3'>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ul className='flex items-center justify-center gap-4 mt-6 pagination'>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map(
          (_, index) => (
            <li
              key={index}
              className={`${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              } rounded-md w-8 h-8 flex items-center justify-center`}
            >
              <button className='page-link' onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default DashboardComponent;
