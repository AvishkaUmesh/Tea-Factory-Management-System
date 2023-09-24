// import styled from 'styled-components';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container } from '@mui/material';

// const AddMachineContainer = styled.div``;

// const AddMachine = () => {
//   const [machines, setMachines] = useState([]);
//   const [formErrors, setFormErrors] = useState({});

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

//   // Handle form submission to add a new machine
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     const form = event.target;

//     // Validate form inputs
//     const errors = {};
//     if (!form.machineID.value) {
//       errors.machineID = 'Machine ID is required';
//     }
//     if (!form.machineModel.value) {
//       errors.machineModel = 'Machine Model is required';
//     }
//     if (!form.sectionNumber.value) {
//       errors.sectionNumber = 'Section Number is required';
//     }
//     if (!form.brand.value) {
//       errors.brand = 'Brand is required';
//     }
//     if (!form.maintenanceCost.value) {
//       errors.maintenanceCost = 'Maintenance Cost is required';
//     }
//     if (!form.lastModifiedDate.value) {
//       errors.lastModifiedDate = 'Last Modified Date is required';
//     }
//     if (!form.status.value) {
//       errors.status = 'Status is required';
//     }
//     setFormErrors(errors);

//     // If there are no errors, add machine to the database
//     if (Object.keys(errors).length === 0) {
//       // Add form data to request body
//       const newMachine = {
//         machineID: event.target.machineID.value,
//         machineModel: event.target.machineModel.value,
//         sectionNumber: event.target.sectionNumber.value,
//         brand: event.target.brand.value,
//         maintenanceCost: event.target.maintenanceCost.value,
//         lastModifiedDate: event.target.lastModifiedDate.value,
//         status: event.target.status.value
//       };

//       axios
//         .post('http://localhost:3000/admin-portal/machine-management/machines', newMachine)
//         .then(() => {
//           // Refresh machines data after successful addition
//           axios
//             .get('http://localhost:3000/admin-portal/machine-management/machines')
//             .then((response) => {
//               setMachines(response.data);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       // Clear form inputs
//       event.target.reset();
//       setFormErrors({});
//     }
//   };

//   return (
//     <AddMachineContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
//       <Container>
//         <form
//           onSubmit={handleFormSubmit}
//           className="flex justify-between flex-col gap-4 py-8 w-full mx-0">
//           <TextField label="Machine ID" name="machineID" required error={formErrors.machineID} />
//           <TextField label="Machine Model" name="machineModel" error={formErrors.machineModel} />
//           <TextField label="Section Number" name="sectionNumber" error={formErrors.sectionNumber} />
//           <TextField label="Brand" name="brand" error={formErrors.brand} />
//           <TextField
//             label="Maintenance Cost"
//             name="maintenanceCost"
//             error={formErrors.maintenanceCost}
//           />
//           <TextField
//             label="Last Modified Date"
//             name="lastModifiedDate"
//             type="date"
//             error={formErrors.lastModifiedDate}
//           />
//           <TextField label="Status" name="status" error={formErrors.status} />
//           <Button type="submit" variant="contained" color="primary">
//             Add Machine
//           </Button>
//         </form>
//       </Container>
//     </AddMachineContainer>
//   );
// };

// export default AddMachine;

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddMachineContainer = styled.div``;

const AddMachine = () => {
  const [machines, setMachines] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch products from backend API
    axios
      .get('http://localhost:3000/admin-portal/machine-management/machines')
      .then((response) => {
        setMachines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Listen for changes to the machines state and trigger a page refresh
    window.location.reload('/machine-management');
  }, [machines]);

  // Handle form submission to add a new product
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Validate form inputs
    const errors = {};
    if (!form.machineID.value) {
      errors.machineID = 'Generator ID is required';
    }
    if (!form.machineModel.value) {
      errors.machineModel = 'Machine Model is required';
    }
    if (!form.sectionNumber.value) {
      errors.sectionNumber = 'Section Number is required';
    }
    if (!form.brand.value) {
      errors.brand = 'Brand is required';
    }
    if (!form.maintenanceCost.value) {
      errors.maintenanceCost = 'Maintenance Cost is required';
    }
    if (!form.lastModifiedDate.value) {
      errors.lastModifiedDate = 'Last Modified Date is required';
    }
    if (!form.status.value) {
      errors.status = 'Status is required';
    }
    setFormErrors(errors);
    // Add form data to request body
    const newMachine = {
      machineID: event.target.machineID.value,
      machineModel: event.target.machineModel.value,
      sectionNumber: event.target.sectionNumber.value,
      brand: event.target.brand.value,
      maintenanceCost: event.target.maintenanceCost.value,
      lastModifiedDate: event.target.lastModifiedDate.value,
      status: event.target.status.value
    };

    axios
      .post('http://localhost:3000/admin-portal/machine-management/machines', newMachine)
      .then(() => {
        // Refresh products data after successful addition
        axios
          .get('http://localhost:3000/admin-portal/machine-management/machines')
          .then((response) => {
            setMachines(response.data);
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
  };

  return (
    <AddMachineContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <Container>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 py-8 w-full mx-0">
          <TextField label="Machine ID" name="machineID" error={formErrors.machineID} />
          <TextField label="Machine Model" name="machineModel" error={formErrors.machineModel} />
          <TextField label="Section Number" name="sectionNumber" error={formErrors.sectionNumber} />
          <TextField label="Brand" name="brand" error={formErrors.brand} />
          <TextField
            label="Maintenance Cost"
            name="maintenanceCost"
            error={formErrors.maintenanceCost}
          />
          <TextField
            label="Last Modified Date"
            name="lastModifiedDate"
            type="date"
            error={formErrors.lastModifiedDate}
          />
          <TextField label="Status" name="status" error={formErrors.status} />
          <Button type="submit" variant="contained" color="primary">
            Add Machine
          </Button>
        </form>
      </Container>
    </AddMachineContainer>
  );
};

export default AddMachine;
