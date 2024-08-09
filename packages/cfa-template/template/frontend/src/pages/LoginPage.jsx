import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components';
import { Button } from '../components';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components';
import { useToast } from '../components';
import API from '../api/api';
import { setAuthToken } from '../actions/auth';
import { LoadingSpinner } from '../components';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const formSchema = z.object({
    username: z
      .string({ required_error: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .max(50),
    password: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters' })
      .max(20, { message: 'Password must be at most 20 characters' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'demo@lefthook.com',
      password: 'demo',
    },
  });

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      dispatch(setAuthToken(jwt));
      history.push('/integrations');
    }
  }, [dispatch, history]);

  const login = async (username, password) => {
    setIsLoading(true);
    const api = new API();
    try {
      const data = await api.login(username, password);
      if (!data.token) {
        toast({
          variant: 'destructive',
          title: 'Oops',
          description: `Failed to login using this base url: ${process.env.REACT_APP_API_BASE_URL}`,
        });
        return;
      }

      const { token } = data;
      sessionStorage.setItem('jwt', token);
      dispatch(setAuthToken(token));
      history.push('/dashboard');
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Oops',
        description: `Login failed. Incorrect username or password`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formValues) => {
    await login(formValues.username, formValues.password);
  };

  const createDemoUser = async () => {
    const api = new API();
    try {
      const data = await api.createUser('demo@lefthook.com', 'demo');
      if (data.token) {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'New user created! Please login!',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Oops',
          description: `Creating a user failed. (It's possible this user already exists...)`,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Oops',
        description: `Login failed. Incorrect username or password`,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow-xl p-12 w-[420px]">
        <div className="flex w-full justify-center">
          <img
            src={`https://friggframework.org/assets/img/frigg-icon.png`}
            alt="Logo"
            style={{ width: 150 }}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="my-3">
            <h3 className="text-xl mb-4 text-l font-semibold text-gray-700">
              Login
            </h3>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="email-input"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="password-input"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button data-testid="login-button" type="submit">
                {isLoading && <LoadingSpinner />}
                Log In
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex flex-col gap-3">
          <Button variant="link" className="text-sm font-medium text-primary">
            Forgot your password?
          </Button>
          <Button
            variant="link"
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
            onClick={createDemoUser}
          >
            Create account (demo user)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
