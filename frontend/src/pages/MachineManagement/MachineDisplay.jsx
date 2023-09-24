import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const MachineDisplayContainer = styled.div``;

const MachineDisplay = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    function getMachines() {
      axios
        .get('http://localhost:3000/admin-portal/machine-management/machines')
        .then((res) => {
          console.log(res.data);
          setMachines(res.data);
        })
        .catch(() => {
          alert(err.message);
        });
    }
    getMachines();
  }, []);

  //delete sale

  return (
    <MachineDisplayContainer className="p-10 mb-[20px] bg-white rounded-xl h-full">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>  */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Machine ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Machine Model
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Section Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Maintained Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Last Modified Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {machines.length > 0 &&
                    machines.map((machine) => (
                      <tr>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{sal._id}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400">
                          {machine.machineID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.machineModel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.sectionNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.brand}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.maintenanceCost}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.lastModifiedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {machine.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a className="text-blue-500 hover:text-blue-700" href="#">
                            Update
                          </a>
                          <a
                            className="text-blue-500 hover:text-blue-700"
                            href="#"
                            onClick={() => deleteSale(machine._id)}>
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MachineDisplayContainer>
  );
};

export default MachineDisplay;
