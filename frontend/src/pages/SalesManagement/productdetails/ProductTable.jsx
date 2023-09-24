import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { TextField } from '@mui/material';
// import CreateIcon from '@mui/icons-material/Create';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ButtonGroup, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { saveAs } from 'file-saver';
// import Header from '../../components/Header';

const ProductContainer = styled.div``;

const ProductDisplay = () => {
  const [Product, setProduct] = useState([]);
  //   const [searchTerm, setSearchTerm] = useState('');

  //search
  //   const handleSearchTermChange = (event) => {
  //     setSearchTerm(event.target.value);
  //   };

  //   const searchedQuotation = sales.filter((sal) =>
  //     sal.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //fetch Quotations
  useEffect(() => {
    function getProducts() {
      axios
        .get('http://localhost:3000/admin-portal/sales-management/all')
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProducts();
  }, []);

  //delete quotation

  //   function deleteQuotation(id) {
  //     axios
  //       .delete('http://localhost:3000/admin-portal/sales-management/deletequo/' + id)
  //       .then(() => {
  //         alert('Deleted successful');

  //         const newrecords = sales.filter((sal) => sal._id != id);
  //         setSales(newrecords);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //generate report
  //   const generatepdf = async () => {
  //     await axios
  //       .post(`http://localhost:3000/admin-portal/sales-management/createpdf`, sales)
  //       .then((response) => {
  //         console.log(response);
  //         axios
  //           .get('http://localhost:3000/admin-portal/sales-management/fetchpdf', {
  //             responseType: 'blob'
  //           })
  //           .then((res) => {
  //             console.log(res);
  //             const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  //             saveAs(pdfBlob, 'sales.pdf');
  //           });
  //       });
  //   };

  return (
    <ProductContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            {/* <div className="flex flex-row justify-between items-between">
              <TextField
                label="Search Quotations"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className=""
              />
              <Button
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
                className=""
                onClick={generatepdf}>
                Export Report
              </Button>
            </div> */}
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                <thead>
                  <tr>
                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>  */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Customer Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Price(Rs:)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Product Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Package Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Weight
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Product.length > 0 &&
                    Product.map((sal) => (
                      <tr key={sal._id}>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{sal._id}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.producttyp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.packagetyp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {sal.status}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ButtonGroup>
                            <Button
                              style={{
                                marginRight: 5,
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                marginTop: 5
                              }}
                              LinkComponent={Link}
                              to={`sales/${sal._id}`}
                              sx={{ mt: 'auto' }}>
                              <CreateIcon />
                            </Button>

                            <Button
                              style={{ backgroundColor: 'Red', color: '#fff' }}
                              onClick={() => deleteQuotation(sal._id)}
                              sx={{ mt: 'auto' }}>
                              <DeleteIcon />
                            </Button>
                          </ButtonGroup>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProductContainer>
  );
};

export default ProductDisplay;
