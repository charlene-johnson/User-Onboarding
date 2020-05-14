import React from 'react';
import Form from "./components/Form"
import styled from "styled-components"

import './App.css';

const Title = styled.h1 `
font-size:  5rem;
font-family: 'Jost', sans-serif;
margin-top: 1.5%;
`

function App() {
  
  return (
    <div className="App">
      <Title>User Onboarding</Title>
      <Form/>    
    </div>
  );
}

export default App;
