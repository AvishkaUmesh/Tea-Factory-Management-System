import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddGeneratorContainer = styled.div`
  flex: 5;
`;

const AddGenerator = () => {
  const [generators, setGenerators] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch generators from backend API
    axios
      .get('http://localhost:3000/admin-portal/machine-management/generators')
      .then((response) => {
        setGenerators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new generator
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Validate form inputs
    const errors = {};
    if (!form.generatorID.value) {
      errors.generatorID = 'Generator ID is required';
    }
    if (!form.sectionNumber.value) {
      errors.sectionNumber = 'Section Number is required';
    }
    if (!form.Voltage.value) {
      errors.Voltage = 'Voltage is required';
    }
    if (!form.fuelNeed.value) {
      errors.fuelNeed = 'Fuel is required';
    }
    if (!form.maintainedTimes.value) {
      errors.maintainedTimes = 'MaintainedTimes is required';
    }
    if (!form.status.value) {
      errors.status = 'Status is required';
    }
    setFormErrors(errors);
    // If there are no errors, add machine to the database
    if (Object.keys(errors).length === 0) {
      // Add form data to request body
      const newGenerator = {
        generatorID: event.target.generatorID.value,
        sectionNumber: event.target.sectionNumber.value,
        Voltage: event.target.Voltage.value,
        fuelNeed: event.target.fuelNeed.value,
        maintainedTimes: event.target.maintainedTimes.value,
        status: event.target.status.value
      };

      axios
        .post('http://localhost:3000/admin-portal/machine-management/generators', newGenerator)
        .then(() => {
          // Refresh products data after successful addition
          axios
            .get('http://localhost:3000/admin-portal/machine-management/generators')
            .then((response) => {
              setGenerators(response.data);
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
      setFormErrors({});
    }
  };

  return (
    <AddGeneratorContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Generator ID" name="generatorID" error={formErrors.generatorID} />
          <TextField label="Section Number" name="sectionNumber" error={formErrors.sectionNumber} />
          <TextField label="Voltage" name="Voltage" error={formErrors.Voltage} />
          <TextField label="Fuel Need" name="fuelNeed" error={formErrors.fuelNeed} />
          <TextField
            label="Maintained Times"
            name="maintainedTimes"
            error={formErrors.maintainedTimes}
          />
          <TextField label="Status" name="status" error={formErrors.status} />
          <div className="col-span-2 flex flex-row justify-end ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#85C20D' }}>
              Add Generator
            </Button>
          </div>
        </form>
      </Container>
    </AddGeneratorContainer>
  );
};

export default AddGenerator;
