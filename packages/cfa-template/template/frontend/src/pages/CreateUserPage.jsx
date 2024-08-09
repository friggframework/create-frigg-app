import React from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import config from '../frigg.config';
import { Input } from '../components';
import { Button } from '../components';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components';
import { useToast } from '../components';

const CreateUserPage = () => {
  const { toast } = useToast();

  const formSchema = z
    .object({
      username: z
        .string({ required_error: 'Email is required' })
        .min(1)
        .max(50),
      password: z
        .string()
        .min(3, { message: 'Password must be at least 3 characters' })
        .max(20, { message: 'Password must be at most 20 characters' }),
      password2: z
        .string()
        .min(3, { message: 'Password must be at least 3 characters' })
        .max(20, { message: 'Password must be at most 20 characters' }),
    })
    .refine((data) => data.password === data.password2, {
      message: 'Passwords must match',
      path: ['password2'],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const createUser = async (username, password) => {
    const api = new API();
    const data = await api.createUser(username, password);
    if (data.token) {
      return toast({
        variant: 'success',
        title: 'Success!',
        description: 'New user created! Please login',
      });
    } else {
      return toast({
        variant: 'destructive',
        title: 'Oops',
        description:
          "Creating a user failed. (It's possible this user already exists...)",
      });
    }
  };

  const handleFormSubmit = async (formValues) => {
    await createUser(formValues.username, formValues.password);
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div className="rounded-lg shadow-xl p-12 w-[420px]">
        <h1 className="text-3xl font-semibold text-primary inline-flex">
          <span className="ml-2">{config.appDisplayName}</span>
        </h1>

        <Form {...form}>
          <form
            className="my-10"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <h3 className="text-xl mb-4 text-l font-semibold text-gray-700">
              Create Account
            </h3>

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@email.com" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Create Account</Button>

              <p className="mt-8">
                <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  Forgot your password?
                </span>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                  to="/"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;
