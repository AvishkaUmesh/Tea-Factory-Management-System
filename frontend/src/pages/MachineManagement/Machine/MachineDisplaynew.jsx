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
  margin: 50px auto 195px 40px;
`;

const THead = styled(TableRow)`
  background: #ffffff;
  & > th {
    color: gray-800;
    font-size: 15px;
    padding: 10px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    color: gray;
    font-size: 15px;
    padding: 10px;
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
      <TableCell>
        <ButtonGroup>
          <Button
            style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', marginTop: 7 }}
            LinkComponent={Link}
            to={`machines/${_id}`}
            sx={{ mt: 'auto' }}>
            <CreateIcon />
          </Button>
          <Button
            style={{ backgroundColor: 'Red', color: '#fff' }}
            onClick={deleteHandler}
            sx={{ mt: 'auto' }}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TBody>
  );
};

const MachineDisplaynew = () => {
  const [machines, setMachines] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setMachines(data.machines));
    fetchHandler().then((data) => setFilterdata(data.machines));
  }, []);
  console.log(machines);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = machines.filter((item) =>
        item.machineID.toUpperCase().includes(getSeacrh)
      );
      setMachines(searchdata);
    } else {
      setMachines(filterdata);
    }
    setQuery(getSeacrh);
  };

  return (
    <div>
      <div className=" p-10 mb-[20px] bg-white rounded-2xl h-[89vh]">
        <input
          type="search"
          name="name"
          value={query}
          className="form-control"
          onChange={(e) => handlesearch(e)}
          placeholder="Search Machine"
          style={{
            width: '20%',
            padding: '12px 20px',
            margin: '10px 0 20px',
            boxSizing: 'border-box',
            borderRadius: '20px',
            border: '2px solid #ccc',
            outline: 'none',
            fontSize: '16px',
            transition: '0.3s',
            '&:focus': {
              border: '2px solid #4CAF50'
            }
          }}
        />
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

export default MachineDisplaynew;
