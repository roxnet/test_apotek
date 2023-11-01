//import React
import React,{ useState } from 'react';

import dayjs from 'dayjs';

import updateLocale from "dayjs/plugin/updateLocale";
//import layout
import Layout from '../../Layouts/Default';

//import Link
import { Link } from '@inertiajs/react';

import { usePage } from '@inertiajs/react';

import Select from 'react-select';

import Datepicker from "react-tailwindcss-datepicker";

export default function MemberIndex({ auth,member, session }) {
    const { flash } = usePage().props
    const [filteredList, setFilteredList] = useState(member);


    const jk = 'L';


    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = [...member];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
             return (
                item.no_ktp.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.users.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || 
                item.jk.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        months: [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
          "Agustus", "September", "Oktober", "November", "Desember"
        ]
      })

    function confirm(){
        return window.confirm("Apakah Anda Yakin Data Akan Dihapus?");
    }
  return (
    <Layout>
        <h1 className="text-3xl text-black pb-2">List Data Member</h1>

        <div className="w-full mt-2">

            <div className="flex my-4 gap-2 justify-between">
                <p className="text-md flex my-4 ">
                   
                </p>
                <div className="flex my-4 gap-1 justify-end">
                    
                    <input className="rounded h-10" type="text" placeholder="Search" onChange={filterBySearch} />
                </div>
                
            </div>
            {flash.message && (
                <div className="w-3/4">
                    <div className="px-4 py-4 rounded text-slate-800 bg-green-300 my-4" role="alert">
                        <p>{flash.message}</p>
                    </div>
                </div>
            )}
            <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">NO KTP</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nama Lengkap</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tgl Lahir</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Jenis Kelamin</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Foto</th>
                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        { filteredList.length>0 ?
                         filteredList.map((member, index) => (
                            <tr key={ index }>
                                <td className="text-left py-3 px-4">{ index+1 }</td>
                                <td className="text-left py-3 px-4">{ member.no_ktp }</td>
                                <td className="text-left py-3 px-4">{ member.users.name }</td>
                                <td className="text-left py-3 px-4">{ dayjs(member.tgl_lahir).format('DD MMMM YYYY') }</td>
                                <td className="text-left py-3 px-4">{ (member.jk==jk) ? 'Laki - Laki':'Perempuan' }</td>
                                <td className="text-left py-3 px-4"><img src={`storage/${member.photo}`} alt="" className="object-contain h-16 w-16"/></td>
                                <td className="text-center">
                                <Link href={ `/member/${member.users.id}/detail` } className="bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-2 rounded text-sm" method="get" as="button" type="button"><i className="fas fa-file"></i></Link>
                                <Link href={ `/member/${member.users.id}/edit` } className="bg-green-500 hover:bg-green-700 mr-3 text-white font-bold py-2 px-2 rounded text-sm" method="get" as="button" type="button"><i className="fas fa-pencil-alt"></i></Link>
                                
                                <Link href={ `/member/${member.users.id}/delete` } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm mr-3" method="delete" as="button" type="button" onBefore={confirm}><i className="fas fa-trash"></i></Link>
                                </td>
                            </tr>
                        )) :''}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
  )
}