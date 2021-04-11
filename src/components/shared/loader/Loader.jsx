import React from "react";
import styled from "styled-components";

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;

const StyledLoader = styled.div`
  border: 2px solid #fff;
  border-top: 2px solid #4375ac;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;
