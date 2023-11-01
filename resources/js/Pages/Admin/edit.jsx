//import hook useState from react
import React, { useState } from 'react';

import Select from 'react-select'

import Datepicker from "react-tailwindcss-datepicker"; 

//import layout
import Layout from '../../Layouts/Default';

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

import { Link, useForm, usePage } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useRef } from 'react';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';


export default function AdminUpdate({ admin,auth }) {

    //define state
    const { data, setData,post,put, patch, errors, processing, recentlySuccessful,progress } = useForm({
        name: admin.name,
        email: admin.email,
        id: admin.id,
        password: '',
        password_confirmation: '',
    });


    //function "UpdateAdmin"
    const UpdateAdmin = async (e) => {

        e.preventDefault();

        post(route('admin.update'));
    }

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg ">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Update Administrator</h2>

                </header>

                <form onSubmit={UpdateAdmin} className="mt-6 space-y-6 max-w-xl">
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Nama Admin" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isFocused
                            autoComplete="name"
                        />

                        <TextInput
                            type="hidden"
                            className="mt-1 block w-full"
                            value={data.id}
                            onChange={(e) => setData('id', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email Admin" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Update</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Update.</p>
                        </Transition>
                    </div>


                </form>
                </div>
            </div>
            <div className="max-w-7x1 mx-auto sm:px-6 lg:px-8 space-y-6 mt-5">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg ">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                    </header>

                    <form onSubmit={updatePassword} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="current_password" value="Current Password" />

                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.current_password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="New Password" />

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Update Password</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Password Berhasil Di Update.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}