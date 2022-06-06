import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HStack,
  Icon,
  Link as LinkContainer,
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
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../hooks';

const ProductListScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    userInfo,
    successCreate,
    createdProductId,
  ]);

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
    <VStack spacing={12} py={12}>
      <Button size='lg' onClick={createProductHandler}>
        New Product
      </Button>
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
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.info.nombre}</Td>
                  <Td>{product.info.categoria}</Td>
                  <Td>{product.info.precio}</Td>
                  <Td>
                    <LinkContainer as={Link} to={`/product/${product.id}/edit`}>
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
