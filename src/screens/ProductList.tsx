import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HStack, Icon, Link as LinkContainer, Table } from '@chakra-ui/react';
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
  const pageNumber = params.pageNumber || 1;

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
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    userInfo,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct('income'));
  };

  return (
    <>
      <HStack>
        <Button
          onClick={createProductHandler}
          variant='success'
          style={{ color: 'black' }}
        >
          New Product
        </Button>
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
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.nombre}>
                  <td>{product.nombre}</td>
                  <td>{product.categoria}</td>
                  <td>{product.precio}</td>
                  <td>
                    <LinkContainer
                      as={Link}
                      to={`/product/${product._id}/edit`}
                    >
                      <Button variant='light'>
                        <Icon as={FaEdit} />
                      </Button>
                    </LinkContainer>
                    <Button onClick={() => deleteHandler(product._id)}>
                      <Icon as={FaTrash} color='red' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
