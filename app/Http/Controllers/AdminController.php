<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function index(){
        $admin=User::where('is_admin',1)->get();

        return inertia('Admin/index',[
            'admin' => $admin,
            'auth'=> \Auth::user(),
        ]);
    }

    public function create(){
        return inertia('Admin/create',[
            'auth'=> \Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => 'required',
        ],
        [
            'name.required' => 'Nama Member Tidak Boleh Kosong!',
            'email.required' => 'Email Tidak Boleh Kosong!',
            'email.unique' => 'Email Sudah Digunakan!',
            'password.required' => 'Password Tidak Boleh Kosong!',
            'password_confirmation.required' => 'Password Konfirmasi Tidak Boleh Kosong!',

        ]
    );


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin'=>1,
        ]);

        return redirect()->route('admin.index')->with('message','Data Berhasil Ditambah');

    }

    public function edit($admin)
    {
        $admin=User::where('is_admin',1)->where('id',$admin)->first();

            return inertia('Admin/edit',[
                'admin' => $admin,
                'auth'=> \Auth::user(),
            ]);

    }

    public function update(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($request->id)],
        ],
        [
            'name.required' => 'Nama Member Tidak Boleh Kosong!',
            'email.required' => 'Email Tidak Boleh Kosong!',
            'email.unique' => 'Email Sudah Digunakan!',
        ]
        );


        $user = User::where('id',$request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->route('admin.index')->with('message','Data Berhasil Dirubah');
    }

    public function delete($id){

        User::where('id',$id)->delete();

        return redirect()->route('admin.index')->with('message','Data Berhasil Dihapus');
    }
}
