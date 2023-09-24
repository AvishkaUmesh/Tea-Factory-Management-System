import styled from 'styled-components';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddMachineContainer = styled.div`
  flex: 4;
`;

const GeneratorDetails = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/machine-management/generators/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.generator));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/machine-management/generators/${id}`, {
        generatorID: String(inputs.generatorID),
        sectionNumber: String(inputs.sectionNumber),
        Voltage: String(inputs.Voltage),
        fuelNeed: String(inputs.fuelNeed),
        maintainedTimes: Number(inputs.maintainedTimes),
        status: String(inputs.status)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/machine-management/all-generators'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AddMachineContainer className="p-3 mb-[20px] bg-white rounded-xl h-[89vh]">
      <div>
        <div className=" p-3 mb-[20px] bg-white rounded-xl h-99">
          {inputs && (
            <form onSubmit={handleSubmit}>
              <Box
                maxWidth={700}
                alignContent={'center'}
                alignSelf="center"
                marginLeft={'auto'}
                marginRight="auto"
                className="grid grid-cols-2 gap-0">
                <FormLabel>GeneratorID</FormLabel>
                <TextField
                  value={inputs.generatorID}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="generatorID"
                  style={{ marginTop: '0' }}
                />

                <FormLabel>Section Number</FormLabel>
                <TextField
                  value={inputs.sectionNumber}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="sectionNumber"
                />

                <FormLabel>Voltage</FormLabel>
                <TextField
                  value={inputs.Voltage}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="Voltage"
                />

                <FormLabel>Fuel Need</FormLabel>
                <TextField
                  value={inputs.fuelNeed}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="fuelNeed"
                />

                <FormLabel>Maintained Times</FormLabel>
                <TextField
                  value={inputs.maintainedTimes}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="maintainedTimes"
                />

                <FormLabel>status</FormLabel>
                <TextField
                  value={inputs.status}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="status"
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#4CAF50',
                    marginTop: '140px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3E8E41'
                    },
                    width: '700px'
                  }}>
                  Update Generator
                </Button>
              </Box>
            </form>
          )}
        </div>
      </div>
    </AddMachineContainer>
  );
};

export default GeneratorDetails;
