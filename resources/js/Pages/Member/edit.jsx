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


export default function UpdateMember({ member,auth }) {

    console.log(member);
    //define state
    const { data, setData,post,put, patch, errors, processing, recentlySuccessful,progress } = useForm({
        name: member.users.name,
        email: member.users.email,
        no_telp: member.no_telp,
        tgl_lahir: {startDate:member.tgl_lahir,endDate:member.tgl_lahir},
        jns_kelamin: member.jk,
        no_ktp: member.no_ktp,
        photo: '',
        photo_review: member.photo,
        users_id: member.users_id,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleValueChange = newValue => {
        setData('tgl_lahir',newValue);
    };

    const handleJkChange = newValue => {
        setData('jns_kelamin',newValue);
    };

    const jk = [
        { value: '', label: 'Pilih Jenis Kelamin' },
        { value: 'L', label: 'Laki - Laki' },
        { value: 'P', label: 'Perempuan' },
      ]

    //function "updateMember"
    const updateMember = async (e) => {

        e.preventDefault();

        post(route('member.update'));
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
                    <h2 className="text-lg font-medium text-gray-900">User Member</h2>

                </header>

                <form onSubmit={updateMember} className="mt-6 space-y-6 max-w-xl">
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Nama Member" />

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
                            value={data.users_id}
                            onChange={(e) => setData('users_id', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email member" />

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

                    <div className="mt-4">
                    <InputLabel htmlFor="no_telp" value="Nomor Telepon" />

                    <TextInput
                        id="no_telp"
                        type="number"
                        name="no_telp"
                        value={data.no_telp}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('no_telp', e.target.value)}
                    />

                    <InputError message={errors.no_telp} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="tgl_lahir" value="Tgl Lahir" />

                        <Datepicker 
                            asSingle={true} 
                            value={data.tgl_lahir} 
                            onChange={handleValueChange}
                            className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"
                            />

                        <InputError message={errors.tgl_lahir} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="jns_kelamin" value="Jenis Kelamin " />
                        <Select  id="jns_kelamin" className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" options={jk} defaultValue={data.jns_kelamin=="L" ? jk[1]:jk[2]}  onChange={handleJkChange} />

                        <InputError message={errors.jns_kelamin} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="no_ktp" value="No KTP" />

                        <TextInput
                            id="no_ktp"
                            type="number"
                            value={data.no_ktp}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('no_ktp', e.target.value)}
                        />

                        <InputError message={errors.no_ktp} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="photo" value="Foto Diri" />
                        <div className="flex flex-row w-full">
                            <div className="flex items-center  gap-10 w-full">
                                <div>
                                    <input id="photo" type="file"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" 
                                        onChange={e => setData('photo', e.target.files[0])}

                                        accept="image/jpg, image/jpeg, image/png, image/svg, image/gif"
                                    />
                                        {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                        )}
                                    <InputLabel htmlFor="photo" className="text-xs text-gray-200 my-2" value="*) Max 1Mb dan Berformat Image" />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>
                                
                            </div>
                            <div className="flex w-full">
                                <img src={`/storage/${data.photo_review}`} alt="" className="object-contain h-32 w-32 mx-auto "/>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
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
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>

            <div className="max-w-7x1 mx-auto sm:px-6 lg:px-8 space-y-6 mt-5">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </Layout>
    )
}