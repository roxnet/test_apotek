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
import InputLabelxl from '@/Components/InputLabelxl';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useRef } from 'react';

import dayjs from 'dayjs';
import updateLocale from "dayjs/plugin/updateLocale";


export default function DetailMember({ member,auth }) {

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

    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        months: [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
          "Agustus", "September", "Oktober", "November", "Desember"
        ]
      })


    return (
        <Layout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg ">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">User Member</h2>

                </header>
                    <div className="mt-4 flex flex-row gap-10">
                        <InputLabel value="Nama Member" className="w-21" />
                        <InputLabel value=":" />
                        <InputLabelxl value={data.name} />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                        <InputLabel htmlFor="email" value="Email member" className="w-24" />
                        <InputLabel value=":" />
                        <InputLabelxl value={data.email} />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                    <InputLabel htmlFor="no_telp" value="Nomor Telepon" className="w-24" />
                    <InputLabel value=":" />
                    <InputLabelxl value={data.no_telp} />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                        <InputLabel htmlFor="tgl_lahir" value="Tgl Lahir" className="w-24" />
                        <InputLabel value=":" />
                        <InputLabelxl value={ dayjs(data.tgl_lahir.startDate).format('DD MMMM YYYY') } />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                        <InputLabel htmlFor="jns_kelamin" value="Jenis Kelamin" className="w-24" />
                        <InputLabel value=":" />
                        <InputLabelxl value={data.jns_kelamin} />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                        <InputLabel htmlFor="no_ktp" value="No KTP" className="w-24" />
                        <InputLabel value=":" />
                        <InputLabelxl value={data.no_ktp} />
                    </div>

                    <div className="mt-4  flex flex-row gap-10">
                        <InputLabel htmlFor="photo" value="Foto Diri" className="w-24" />
                        <InputLabel value=":" />
                        <img src={`/storage/${data.photo_review}`} alt="" className="object-contain h-32 w-32"/>

                    </div>

                    <div className=" flex flex-row gap-10 items-center">
                        <Link href={ `/member` } className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" method="get" as="button" type="button">Kembali</Link>
                    </div>


                </div>
            </div>

        </Layout>
    )
}