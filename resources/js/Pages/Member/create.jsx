//import hook useState from react
import React, { useState } from 'react';

import Select from 'react-select'

import Datepicker from "react-tailwindcss-datepicker"; 

//import layout
import Layout from '../../Layouts/Default';

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

import { Link } from '@inertiajs/inertia-react';

import { router } from '@inertiajs/react'

export default function CreateTransaksi({ errors }) {

    //define state
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [rateuro, setrateEuro] = useState('');
    const [datepaid, setdatePaid] = useState('');

    const [newRowIncome, setNewRowIncome] = useState([{namatransaksi:'',nominal:''}]);

    const [newRowExpense, setNewRowExpense] = useState([{namatransaksi:'',nominal:''}]);

    const [counter, setCounter] = useState(1);

    const options = [
        { value: '1', label: 'Income' },
        { value: '2', label: 'Expense' },
      ]

    //function "storeTransaksi"
    const storeTransaksi = async (e) => {
        e.preventDefault();
        Inertia.post('/transaksi/store', {
            description: description,
            code: code,
            rate_euro: rateuro,
            date_paid: datepaid,
            row_income: newRowIncome,
            row_expense: newRowExpense,
            // _token: this.$page.props.csrf_token,
        });
    }
    const addRowIncome = () => {
        let newfield = { namatransaksi: '', nominal: ''}
    
        setNewRowIncome([...newRowIncome, newfield])
    }

    const addRowExpense = () => {
        let newfield = { namatransaksi: '', nominal: ''}
    
        setNewRowExpense([...newRowExpense, newfield])
    }

    const handleFormChangeIncome = (index, event) => {
        let data = [...newRowIncome];
        data[index][event.target.name] = event.target.value;
        setNewRowIncome(data);
    }

    const handleFormChangeExpense = (index, event) => {
        let data = [...newRowExpense];
        data[index][event.target.name] = event.target.value;
        setNewRowExpense(data);
    }

    const handleValueChange = newValue => {
        console.log("newValue:", newValue);
        setdatePaid(newValue);
    };

    const removeFieldsIncome = (index) => {
        let data = [...newRowIncome];
        data.splice(index, 1)
        setNewRowIncome(data)
    }

    const removeFieldsExpense = (index) => {
        let data = [...newRowExpense];
        data.splice(index, 1)
        setNewRowExpense(data)
    }

    return (
        <Layout>

            <h1 className="w-full text-3xl text-black pb-1">Transaksi</h1>

            <div className="flex flex-wrap">
                <div className="w-full mt-3 pl-0 lg:pl-2">
                    <div className="leading-loose">
                        <form className="p-10 bg-white rounded shadow-xl" onSubmit={storeTransaksi}>
                            {/* <p className="text-lg text-gray-800 font-medium pb-4">Customer information</p> */}
                            <div className="flex gap-10 w-full ">
                                <div className="flex gap-4 w-1/2 relative">
                                    <label className="text-md font-bold text-gray-600">Deskripsi</label>
                                    <textarea className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded" rows="3" placeholder="Masukkan Deskripsi" aria-label="Deksripsi" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    {errors.description && (
                                        <div className="absolute  bottom-0 border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
                                        <p>{errors.description}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col w-1/2">
                                    
                                    <div className="flex items-center gap-8 w-full">
                                        <label className="w-1/4 text-md font-bold text-gray-600">Date Paid</label>
                                        <div className="w-full">
                                            <Datepicker 
                                                asSingle={true} 
                                                value={datepaid} 
                                                onChange={handleValueChange}
                                                className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"
                                                />
                                            {errors.datepaid && (
                                                <div className="border border-red-400 rounded bg-red-100 px-2 py-1/2 mt-1 text-red-700">
                                                <p>{errors.datepaid}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                    </div>
                                    <div className="flex items-center gap-8 w-full  my-2">
                                        <label className="w-1/4 text-md font-bold text-gray-600">Code </label>
                                        <div className="w-full">
                                            <input className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded"   type="text" placeholder="Masukkan Kode Transaksi" aria-label="Kode Transaksi" value={code} onChange={(e) => setCode(e.target.value)} />
                                            {errors.code && (
                                                <div className="border border-red-400 rounded bg-red-100 px-2 py-1/2 mt-1 text-red-700">
                                                <p>{errors.code}</p>
                                                </div>
                                            )}
                                        </div>

                                        
                                    </div>
                                    <div className="flex items-center gap-8 w-full">
                                        <label className="w-1/4 text-md font-bold text-gray-600">Rate Euro</label>
                                        <div className="w-full">
                                            <input className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded" type="number" placeholder="Rate Euro" aria-label="Rate Euro" value={rateuro} onChange={(e) => setrateEuro(e.target.value)}/>
                                            {errors.rateuro && (
                                                <div className="border border-red-400 rounded bg-red-100 px-2 py-1/2 mt-1 text-red-700">
                                                <p>{errors.rateuro}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="mt-5 mx-auto pb-10 bg-white rounded shadow-xl border-2">
                                <p className="text-lg font-bold text-gray-800 p-4">Data Transaksi</p>
                                <div className="leading-loose">
                                    <div className="w-3/4 mx-auto p-5 bg-white rounded shadow-xl border-2">
                                        <div className="py-1 w-full">
                                            <div className="flex items-center gap-8 w-full">
                                                <label className="w-1/4 text-md font-bold text-gray-600">Kategori</label>
                                                <Select options={options} defaultValue={options[0]} className="w-1/2 px-2 py-2 text-gray-700 bg-gray-100 rounded" />
                                            </div>
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded my-4" type="button" onClick={addRowIncome}>
                                                <i className="fas fa-plus-circle mr-3r"></i> Tambah Data
                                            </button>
                                            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                                                <table className="min-w-full bg-white">
                                                <thead className="bg-gray-800 text-white">
                                                    <tr>
                                                        <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Nama Transaksi</th>
                                                        <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Nominal (IDR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-700">
                                                {newRowIncome.map((input, index) => (
                                                    <tr key={index} id={index} className="bg-gray-100">
                                                        <td className="text-left py-3 px-4">
                                                            <input className="w-full px-1 py-1 text-gray-700 rounded border-2" type="text" name="namatransaksi" value={input.namatransaksi} onChange={event => handleFormChangeIncome(index, event)}/>
                                                        </td>
                                                        <td className="text-left py-3 px-4">
                                                            <input className="w-full px-1 py-1 text-gray-700 rounded border-2" type="number" name="nominal" value={input.nominal} onChange={event => handleFormChangeIncome(index,event)}/>
                                                        </td>
                                                        <td><button className=" mx-1 rounded-full text-white font-light tracking-wider bg-red-600 my-4 px-2.5" type="button" onClick={() => removeFieldsIncome(index)}>
                                                        <i className="fas fa-times"></i>
                                                        </button></td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="leading-loose mt-5">
                                    <div className="w-3/4 mx-auto p-5 bg-white rounded shadow-xl border-2">
                                        <div className="py-1 w-full">
                                            <div className="flex items-center gap-8 w-full">
                                                <label className="w-1/4 text-md font-bold text-gray-600">Kategori</label>
                                                <Select options={options} defaultValue={options[1]} className="w-1/2 px-2 py-2 text-gray-700 bg-gray-100 rounded" />
                                            </div>
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded my-4" type="button" onClick={addRowExpense}>
                                                <i className="fas fa-plus-circle mr-3r"></i> Tambah Data
                                            </button>
                                            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                                                <table className="min-w-full bg-white">
                                                <thead className="bg-gray-800 text-white">
                                                    <tr>
                                                        <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Nama Transaksi</th>
                                                        <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Nominal (IDR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-700">
                                                {newRowExpense.map((input, index) => (
                                                    <tr key={index} id={index} className="bg-gray-100">
                                                        <td className="text-left py-3 px-4">
                                                            <input className="w-full px-1 py-1 text-gray-700 rounded border-2" type="text" name="namatransaksi" value={input.namatransaksi} onChange={event => handleFormChangeExpense(index, event)}/>
                                                        </td>
                                                        <td className="text-left py-3 px-4">
                                                            <input className="w-full px-1 py-1 text-gray-700 rounded border-2" type="number" name="nominal" value={input.nominal} onChange={event => handleFormChangeExpense(index,event)}/>
                                                        </td>
                                                        <td>
                                                        <button className=" mx-1 rounded-full text-white font-light tracking-wider bg-red-600 my-4 px-2.5" type="button" onClick={() => removeFieldsExpense(index)}>
                                                        <i className="fas fa-times"></i>
                                                        </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 text-right">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded mr-5" type="submit">Simpan</button>
                                <Link href="/transaksi" className="py-3 px-4 text-white font-light tracking-wider bg-blue-900 rounded">Kembali</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}