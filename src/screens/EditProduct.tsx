import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(id));
        navigate('/productlist');
      } else if (!product || product._id !== id) {
        dispatch(detailsProduct(id));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setImage(product.image);
      }
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate, dispatch, product, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(id, {
        name,
        description,
        category,
        price,
        image,
      })
    );
  };

  return (
    <>
      <Link to='/Productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Text>Loading</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <VStack>
          <h1>Edit Product</h1>
          {loadingUpdate && <Text>Loading</Text>}
          {errorUpdate && <Text>{errorUpdate}</Text>}
          {loading ? (
            <Text>Loading</Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter name'
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder='Enter category'
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Enter description'
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Precio</FormLabel>
                <Input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Enter description'
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Imagen</FormLabel>
                <input
                  type='input'
                  value={image}
                  onChange={(e) => setImage(e.target.files[0])}
                ></input>
              </FormControl>

              <Button type='submit'>Actualizar</Button>
            </form>
          )}
        </VStack>
      )}
    </>
  );
};

export default EditProduct;
