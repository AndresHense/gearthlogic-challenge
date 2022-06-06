import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProduct from './screens/EditProduct';
import LoginScreen from './screens/LoginScreen';
import ProductList from './screens/ProductList';

function App() {
  return (
    <Flex direction='column' h='100vh'>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
      </Routes>
    </Flex>
  );
}

export default App;
