//import React
import React from 'react';

//import Link
import { Link } from '@inertiajs/inertia-react';

import { usePage } from '@inertiajs/react';

import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import InputLabelxl from '@/Components/InputLabelxl';

function Layout({ children }) {

    const { auth } = usePage().props;  
    return (
        <>
            <div className="bg-gray-100 font-family-karla flex">
                <aside className="relative bg-sidebar hidden h-screen w-64 sm:block shadow-xl">
                    <div className="p-6">
                        <Link href="#" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Dashboard</Link>
                        <Link href="/logout" className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        <i className="fas fa-arrow-left mr-3"></i> Logout
                        </Link>
                    </div>
                    <nav className="text-white text-base font-semibold pt-3">
                        {/* <Link href="/profile" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"> */}
                        <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')} className="flex items-center py-4 pl-6 nav-item active-nav-link">
                            <i className="fas fa-sticky-note mr-3"></i>
                            Profil
                        </ResponsiveNavLink>
                    </nav>
        	        { auth.is_admin==1 ?
                        <nav className="text-white text-base font-semibold pt-3">
                        <ResponsiveNavLink href={route('admin.index')} active={route().current('admin.index')} className="flex items-center py-4 pl-6 nav-item active-nav-link">
                            <i className="fas fa-sticky-note mr-3"></i>
                            Admin
                        </ResponsiveNavLink>
                    </nav>:''}
                    { auth.is_admin==1 ?
                    <nav className="text-white text-base font-semibold pt-3">
                        <ResponsiveNavLink href={route('member.index')} active={route().current('member.index')} className="flex items-center py-4 pl-6 nav-item active-nav-link">
                            <i className="fas fa-sticky-note mr-3"></i>
                            Member
                        </ResponsiveNavLink>
                    </nav>
                    :''}
                </aside>

                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                    {/* Desktop Header */}

                    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                        <div className="w-1/2 bg-slate-300"></div>
                        <div x-data="{ isOpen: false }" className="relative w-1/2 flex justify-end">
                        <InputLabelxl value={auth.name} className="mr-5 mt-2 text-xl" />
                            <button className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">

                                <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                            </button>
                            {/* <button x-show="isOpen" @click="isOpen = false" className="h-full w-full fixed inset-0 cursor-default"></button> */}
                            {/* <button x-show="isOpen" className="h-full w-full fixed inset-0 cursor-default"></button>
                            <div x-show="isOpen" className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
                                <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
                            </div> */}
                        </div>
                    </header>

                    {/* <!-- Mobile Header & Nav --> */}
                    <header x-data="{ isOpen: false }" className="w-full bg-sidebar py-5 px-6 sm:hidden">
                        <div className="flex items-center justify-between">
                            <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                            {/* <button @click="isOpen = !isOpen" className="text-white text-3xl focus:outline-none">
                                <i x-show="!isOpen" className="fas fa-bars"></i>
                                <i x-show="isOpen" className="fas fa-times"></i>
                            </button> */}
                            <button className="text-white text-3xl focus:outline-none">
                                <i x-show="!isOpen" className="fas fa-bars"></i>
                                <i x-show="isOpen" className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* <!-- Dropdown Nav --> */}
                        {/* <nav :className="isOpen ? 'flex': 'hidden'" className="flex flex-col pt-4"> */}
                        <nav className="flex flex-col pt-4">
                            <Link href="/member" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                                <i className="fas fa-sticky-note mr-3"></i>
                                Member
                            </Link>
                        </nav>
                    </header>
                
                    <div className="w-full overflow-x-hidden border-t flex flex-col">
                        <main className="w-full flex-grow p-6">
                        { children }
                        </main>
                
                        <footer className="w-full bg-white text-right p-4 mt-10">
                            Built by <a target="_blank" href="https://davidgrzyb.com" className="underline">David Grzyb</a>.
                        </footer>
                    </div>
                    
                </div>
            </div>
        </>
    )

}

export default Layout