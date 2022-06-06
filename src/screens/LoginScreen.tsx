import {
  Box,
  Button,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useAppDispatch, useAppSelector } from '../hooks';

const LoginScreen = () => {
  document.title = 'Login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo?.localId) {
      navigate('/products');
    }
  }, [userInfo?.localId]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <VStack justify='center' h='100vh'>
      <form onSubmit={submitHandler}>
        <VStack
          alignItems='start'
          px={{ base: 8, md: 24, lg: 38, xl: 32 }}
          w='100%'
          spacing={{ base: 12, xl: 10 }}
        >
          <Box w='100%'>
            <Text textStyle='h2'>E-MAIL</Text>
            <Input
              placeholder='Ingresa tu correo electronico'
              _placeholder={{ color: 'white' }}
              variant='flushed'
              textStyle='h3'
              value={email}
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box w='100%'>
            <Text textStyle='h2'>CONTRASEÑA</Text>
            <Input
              placeholder='Ingresa tu contraseña'
              variant='flushed'
              _placeholder={{ color: 'white' }}
              textStyle='h3'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            borderRadius={999}
            type='submit'
            bg='#083045'
            _hover={{ bg: '#e8e8e8', color: 'black' }}
            color='white'
            size='lg'
            marginX='2rem'
            w='170px'
          >
            Ingresar
          </Button>
          <Stack direction={{ base: 'column', xl: 'row' }}>
            <Text textStyle='h3'>
              ¿No tienes una cuenta?
              <Link
                as={ReactLink}
                to='/register'
                color='white'
                fontSize='lg'
                _hover={{ color: 'black' }}
                fontStyle='italic'
              >
                {' '}
                Crea una nueva cuenta aqui
              </Link>
            </Text>
          </Stack>
        </VStack>
      </form>
    </VStack>
  );
};

export default LoginScreen;
