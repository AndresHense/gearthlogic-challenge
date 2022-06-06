import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// migrate to chakra
import {
  Button,
  Table,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  let totalAmount = 0;
  if (products)
    totalAmount = products.reduce(
      (acc, p) => acc + (p.type === 'INCOME' ? p.amount : -p.amount),
      0
    );

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
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
  const createIncomeHandler = () => {
    dispatch(createProduct('income'));
  };
  const createOutcomeHandler = () => {
    dispatch(createProduct('outcome'));
  };
  return (
    <>
      <Col className=''>
        <Button
          className='my-3 mx-2'
          onClick={createIncomeHandler}
          variant='success'
          style={{ color: 'black' }}
        >
          <i className='fas fa-plus'> New Income</i>
        </Button>
        <Button className='my-3' onClick={createOutcomeHandler}>
          <i className='fas fa-plus'> New Outcome</i>
        </Button>
      </Col>
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
          <Table striped bordered hover responsive>
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
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
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
