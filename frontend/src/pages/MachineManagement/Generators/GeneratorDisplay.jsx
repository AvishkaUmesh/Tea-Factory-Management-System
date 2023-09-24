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

const URL = 'http://localhost:3000/admin-portal/machine-management/generators';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 175px 40px;
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
  const { _id, generatorID, sectionNumber, Voltage, fuelNeed, maintainedTimes, status } =
    props.generator;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3000/admin-portal/machine-management/generators/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/machine-management/all-generators'));
  };

  return (
    <TBody>
      <TableCell>{generatorID}</TableCell>
      <TableCell>{sectionNumber}</TableCell>
      <TableCell>{Voltage}</TableCell>
      <TableCell>{fuelNeed}</TableCell>
      <TableCell>{maintainedTimes}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            style={{ marginRight: 10, backgroundColor: '#4CAF50', color: '#fff', marginTop: 7 }}
            LinkComponent={Link}
            to={`generators/${_id}`}
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

const GeneratorDisplay = () => {
  const [generators, setGenerators] = useState();
  const [filterdata, setFilterdata] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setGenerators(data.generators));
    fetchHandler().then((data) => setFilterdata(data.generators));
  }, []);
  console.log(generators);

  const handlesearch = (event) => {
    const getSeacrh = event.target.value;
    setQuery(getSeacrh);
    //console.log(getSeacrh);

    if (getSeacrh.length > 0) {
      const getSeacrh = event.target.value;
      const searchdata = generators.filter((item) =>
        item.generatorID.toUpperCase().includes(getSeacrh)
      );
      setGenerators(searchdata);
    } else {
      setGenerators(filterdata);
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
          placeholder="Search..."
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
              <TableCell>Generator ID</TableCell>
              <TableCell>SecNo</TableCell>
              <TableCell>Voltage</TableCell>
              <TableCell>Fuel Need</TableCell>
              <TableCell>Maintained Times</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </THead>
          </TableHead>

          <TableBody>
            {generators &&
              generators.map((generator, i) => <Machine key={i} generator={generator} />)}
          </TableBody>
        </StyledTable>
      </div>
    </div>
  );
};

export default GeneratorDisplay;
