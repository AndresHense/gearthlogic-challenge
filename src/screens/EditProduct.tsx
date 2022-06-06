import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { useAppDispatch, useAppSelector } from '../hooks';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productDetails = useAppSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useAppSelector((state) => state.productUpdate);
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
        navigate('/products');
      } else if (!product || product.id !== id) {
        dispatch(detailsProduct(id));
      } else {
        setName(product.info.nombre);
        setDescription(product.info.descripcion);
        setCategory(product.info.categoria);
        setPrice(product.info.precio);
        setImage(product.info.imagen);
      }
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate, dispatch, product, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(id, {
        nombre: name,
        descripcion: description,
        categoria: category,
        precio: price,
        imagen: image,
      })
    );
  };

  return (
    <>
      <Link bg='#e4e4e4' p={4} as={ReactLink} to='/products'>
        Go Back
      </Link>
      {loading ? (
        <Text>Loading</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <VStack spacing={4} pt={8}>
          <Box display='flex' alignItems='start' flexDirection='column'>
            <Text fontSize='4xl' fontWeight='bold'>
              Edit Product
            </Text>
            {loadingUpdate && <Text>Loading</Text>}
            {errorUpdate && <Text>{errorUpdate}</Text>}
            {loading ? (
              <Text>Loading</Text>
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <form onSubmit={submitHandler}>
                <FormControl py={3}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name'
                  ></Input>
                </FormControl>

                <FormControl py={3}>
                  <FormLabel>Categoria</FormLabel>
                  <Input
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder='Enter category'
                  ></Input>
                </FormControl>

                <FormControl py={3}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter description'
                  ></Input>
                </FormControl>

                <FormControl py={3}>
                  <FormLabel>Precio</FormLabel>
                  <Input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    placeholder='Enter description'
                  ></Input>
                </FormControl>

                <FormControl py={3}>
                  <FormLabel>Imagen</FormLabel>
                  <Input
                    type='text'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>

                <Button
                  mt={3}
                  mx={0}
                  size='lg'
                  colorScheme='blue'
                  type='submit'
                >
                  Actualizar
                </Button>
              </form>
            )}
          </Box>
        </VStack>
      )}
    </>
  );
};

export default EditProduct;
