import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Datepicker from "react-tailwindcss-datepicker";
import Select from 'react-select';

import React, { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        no_telp:'',
        tgl_lahir:'',
        jns_kelamin:'',
        no_ktp:'',
        photo: '',
    });

    
    const jk = [
        { value: '', label: 'Pilih Jenis Kelamin' },
        { value: 'L', label: 'Laki - Laki' },
        { value: 'P', label: 'perempuan' },
      ]

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleValueChange = newValue => {
        setData('tgl_lahir',newValue);
    };

    const handleJkChange = newValue => {
        setData('jns_kelamin',newValue);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Member" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email Member" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
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
                    <InputLabel htmlFor="jns_kelamin" value="Jenis Kelamin" />

                     <Select  id="jns_kelamin" className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" options={jk} defaultValue={jk[0]}  onChange={handleJkChange} />

                    <InputError message={errors.jns_kelamin} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="no_ktp" value="No KTP" />

                    <TextInput
                        id="no_ktp"
                        type="number"
                        name="no_ktp"
                        value={data.no_ktp}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('no_ktp', e.target.value)}
                    />

                    <InputError message={errors.no_ktp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="photo" value="Foto Diri" />

                    <input id="photo" type="file"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" 
                        // value={data.photo}
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

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sudah Punya Akun?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
