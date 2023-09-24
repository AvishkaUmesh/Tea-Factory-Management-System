import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddCropContainer = styled.div``;

const AddCrop = () => {
  const [Crops, setCrops] = useState([]);

  useEffect(() => {
    // Fetch Crops from backend API
    axios
      .get('http://localhost:3000/admin-portal/crops')
      .then((response) => {
        setCrops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add form data to request body
    const newCrop = {
      cropsID: event.target.cropsID.value,
      supplierName: event.target.supplierName.value,
      contactNumber: event.target.contactNumber.value,
      weight: event.target.weight.value,
      date: event.target.date.value
    };

    axios
      .post('http://localhost:3000/admin-portal/crops', newCrop)
      .then(() => {
        // Refresh products data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/crops')
          .then((response) => {
            setCrops(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    event.target.reset();
  };

  return (
    <AddCropContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Crops ID" name="cropsID" />
          <TextField label="supplier Name" name="supplierName" />
          <TextField label="Contact Number" name="contactNumber" />
          <TextField label="weight" name="weight" />
          <TextField label="date" name="date" />
          <div className="col-span-2 flex flex-row justify-end ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#85C20D' }}>
              ADD Crop
            </Button>
          </div>
        </form>
      </Container>
    </AddCropContainer>
  );
};

export default AddCrop;
