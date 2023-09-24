// import styled from 'styled-components';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container } from '@mui/material';

// const AddMachineContainer = styled.div``;

// const AddMachine = () => {
//   const [machines, setMachines] = useState([]);

//   useEffect(() => {
//     // Fetch machines from backend API
//     axios
//       .get('http://localhost:3000/admin-portal/machine-management/machines')
//       .then((response) => {
//         setMachines(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // Handle form submission to add a new product
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Add form data to request body
//     const newMachine = {
//       machineID: event.target.machineID.value,
//       machineModel: event.target.machineModel.value,
//       sectionNumber: event.target.sectionNumber.value,
//       brand: event.target.brand.value,
//       maintenanceCost: event.target.maintenanceCost.value,
//       lastModifiedDate: event.target.lastModifiedDate.value,
//       status: event.target.status.value
//     };

//     axios
//       .post('http://localhost:3000/admin-portal/machine-management/machines', newMachine)
//       .then(() => {
//         // Refresh products data after successful addition
//         axios
//           .get('http://localhost:3000/admin-portal/machine-management/machines')
//           .then((response) => {
//             setMachines(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Clear form inputs
//     event.target.reset();
//   };

//   return (
//     <AddMachineContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
//       <Container>
//         <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
//           <TextField label="Machine RegNo" name="machineID" />

//           <TextField label="Machine Model" name="machineModel" />
//           <TextField label="Section Number" name="sectionNumber" />
//           <TextField label="Brand" name="brand" />
//           <TextField label="Maintenance Cost" name="maintenanceCost" type="number" />
//           <TextField label="Last Modified Date" name="lastModifiedDate" type="date" />
//           <TextField label="Status" name="status" />
//           <div className="col-span-2 flex flex-row justify-end ">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               style={{ backgroundColor: '#85C20D' }}>
//               ADD MACHINE
//             </Button>
//           </div>
//         </form>
//       </Container>
//     </AddMachineContainer>
//   );
// };

// export default AddMachine;

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AddMachineContainer = styled.div``;

const AddMachine = () => {
  const [machines, setMachines] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch machines from backend API
    axios
      .get('http://localhost:3000/admin-portal/machine-management/machines')
      .then((response) => {
        setMachines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const machineID = form.machineID.value.trim();
    const machineModel = form.machineModel.value.trim();
    const sectionNumber = form.sectionNumber.value.trim();
    const brand = form.brand.value.trim();
    const maintenanceCost = parseFloat(form.maintenanceCost.value.trim());
    const lastModifiedDate = form.lastModifiedDate.value.trim();
    const status = form.status.value.trim();

    // Validate form fields
    if (!machineID) {
      window.alert('Please enter a machine Registration Number.');
      return;
    }

    if (!machineModel) {
      window.alert('Please enter a machine model.');
      return;
    }

    if (!sectionNumber) {
      window.alert('Please enter a section number.');
      return;
    }

    if (!brand) {
      window.alert('Please enter a brand.');
      return;
    }

    if (isNaN(maintenanceCost)) {
      window.alert('Please enter a valid maintenance cost.');
      return;
    }

    if (!lastModifiedDate) {
      window.alert('Please enter a last modified date.');
      return;
    }

    if (!status) {
      window.alert('Please enter a status.');
      return;
    }

    const newMachine = {
      machineID,
      machineModel,
      sectionNumber,
      brand,
      maintenanceCost,
      lastModifiedDate,
      status
    };

    axios
      .post('http://localhost:3000/admin-portal/machine-management/machines', newMachine)
      .then(() => {
        // Refresh machines data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/machine-management/machines')
          .then((response) => {
            setMachines(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setOpen(true);
        navigate.push('/machine-management');
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear form inputs
    form.reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AddMachineContainer className="p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Machine RegNo" name="machineID" />

          <TextField label="Machine Model" name="machineModel" />
          <TextField label="Section Number" name="sectionNumber" />
          <TextField label="Brand" name="brand" />
          <TextField label="Maintenance Cost" name="maintenanceCost" type="number" />
          <TextField label="Last Modified Date" name="lastModifiedDate" type="date" />
          <TextField label="Status" name="status" />
          <div className="col-span-2 flex flex-row justify-end ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#85C20D' }}>
              ADD MACHINE
            </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Machine added successfully!
          </MuiAlert>
        </Snackbar>
      </Container>
    </AddMachineContainer>
  );
};

export default AddMachine;
