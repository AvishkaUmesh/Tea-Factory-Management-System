import React, { useEffect, useState } from 'react';
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000/admin-portal/machine-management/machines';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;

const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 15px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 15px;
  }
`;

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Machine = (props) => {
  const history = useNavigate();
  const {
    _id,
    machineID,
    machineModel,
    sectionNumber,
    brand,
    maintenanceCost,
    lastModifiedDate,
    status
  } = props.machine;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3000/admin-portal/machine-management/machines/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/machine-management'));
  };

  return (
    <TBody>
      <TableCell>{machineID}</TableCell>
      <TableCell>{machineModel}</TableCell>
      <TableCell>{sectionNumber}</TableCell>
      <TableCell>{brand}</TableCell>
      <TableCell>{maintenanceCost}</TableCell>
      <TableCell>{lastModifiedDate}</TableCell>
      <TableCell>{status}</TableCell>

      <ButtonGroup>
        <Button
          style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', marginTop: 7 }}
          LinkComponent={Link}
          to={`machines/${_id}`}
          sx={{ mt: 'auto' }}>
          Update
          <CreateIcon />
        </Button>
        <Button
          style={{ backgroundColor: 'Red', color: '#fff' }}
          onClick={deleteHandler}
          sx={{ mt: 'auto' }}>
          Delete
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </TBody>
  );
};

const Machines = () => {
  const [machines, setMachines] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setMachines(data.machines));
  }, []);

  return (
    <div>
      <div className=" p-10 mb-[20px] bg-white rounded-xl h-full">
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>MachineID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>SecNo</TableCell>
              <TableCell>brand</TableCell>
              <TableCell>Maintenance Cost</TableCell>
              <TableCell>Last Modified Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </THead>
          </TableHead>

          <TableBody>
            {machines && machines.map((machine, i) => <Machine key={i} machine={machine} />)}
          </TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default Machines;
