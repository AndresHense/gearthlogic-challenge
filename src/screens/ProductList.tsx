import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HStack,
  Icon,
  Link as LinkContainer,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { useNavigate, useParams } from 'react-router-dom';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { logout } from '../actions/userActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../hooks';

const ProductListScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const productList = useAppSelector((state) => state.productList);
  const { products } = productList;

  const productDelete = useAppSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useAppSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    productId: createdProductId,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/product/${createdProductId}/edit`);
    } else {
      dispatch(listProducts());
      const categoriesArray = [
        ...new Set(products.map((product) => product.info.categoria)),
      ];
      //console.log('array cat', categoriesArray);
      setCategories(categoriesArray);
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    userInfo,
    successCreate,
    createdProductId,
  ]);
  useEffect(() => {}, [categories]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(
      createProduct({
        categoria: '',
        nombre: '',
        precio: 0,
        imagen: '',
        descripcion: '',
      })
    );
  };

  return (
    <VStack spacing={8}>
      <Button
        alignSelf='start'
        m={5}
        colorScheme='blackAlpha'
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
      <HStack>
        <Button size='lg' px={12} onClick={createProductHandler}>
          New Product
        </Button>
        <Select onChange={(e) => setFilter(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </HStack>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <TableContainer w='100%' alignSelf='center' px={32}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products
                .filter((p) => p.info.categoria === filter || filter === '')
                .map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.info.nombre}</Td>
                    <Td>{product.info.categoria}</Td>
                    <Td>{product.info.precio}</Td>
                    <Td>
                      <LinkContainer
                        as={Link}
                        to={`/product/${product.id}/edit`}
                      >
                        <Button variant='light'>
                          <Icon as={FaEdit} />
                        </Button>
                      </LinkContainer>
                      <Button onClick={() => deleteHandler(product.id)}>
                        <Icon as={FaTrash} color='red' />
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
};

export default ProductListScreen;
