import styled from 'styled-components';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddMachineContainer = styled.div`
  flex: 4;
`;

const MachineDetails = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  console.log(id);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/admin-portal/machine-management/machines/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.machine));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3000/admin-portal/machine-management/machines/${id}`, {
        machineID: String(inputs.machineID),
        machineModel: String(inputs.machineModel),
        sectionNumber: String(inputs.sectionNumber),
        brand: String(inputs.brand),
        maintenanceCost: Number(inputs.maintenanceCost),
        lastModifiedDate: Date(inputs.lastModifiedDate),
        status: String(inputs.status)
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/machine-management'));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AddMachineContainer className="p-3 mb-[20px] bg-white rounded-xl h-99">
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
                <FormLabel>MachineID</FormLabel>
                <TextField
                  value={inputs.machineID}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="machineID"
                  style={{ marginTop: '0' }}
                />

                <FormLabel>Machine Model</FormLabel>
                <TextField
                  value={inputs.machineModel}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="machineModel"
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

                <FormLabel>Brand</FormLabel>
                <TextField
                  value={inputs.brand}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="brand"
                />

                <FormLabel>Maintenance Cost</FormLabel>
                <TextField
                  value={inputs.maintenanceCost}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="maintenanceCost"
                />

                <FormLabel>Last Modified Date</FormLabel>
                <TextField
                  value={inputs.lastModifiedDate}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="lastModifiedDate"
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
                    marginTop: '40px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3E8E41'
                    },
                    width: '700px'
                  }}>
                  Update Machine
                </Button>
              </Box>
            </form>
          )}
        </div>
      </div>
    </AddMachineContainer>
  );
};

export default MachineDetails;
