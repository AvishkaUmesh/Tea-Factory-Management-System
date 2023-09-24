import React from 'react';
import styled from 'styled-components';
import Update from '../Update';

const UpdateLayoutContainer = styled.div`
  flex: 5;
`;

const UpdateLayout = () => {
  return (
    <UpdateLayoutContainer className="flex-5 gap-5 h-full m-[20px] mt-0 ml-[10px]">
      <Update />
    </UpdateLayoutContainer>
  );
};

export default UpdateLayout;
