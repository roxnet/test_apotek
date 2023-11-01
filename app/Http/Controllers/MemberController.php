<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{

    public function index(){
        $member=Member::with('users')->get();

        return inertia('Member/index',[
            'member' => $member,
            'auth'=> \Auth::user(),
        ]);
    }

    public function create(){
        return inertia('Member/create');
    }

    public function edit($member)
    {
        $member=Member::with('users')->where('users_id',$member)->first();

            if($member){
                $member->tgl_lahir=date('Y-m-d', strtotime($member->tgl_lahir));
            }
    
            return inertia('Member/edit',[
                'member' => $member,
                'auth'=> \Auth::user(),
            ]);

    }

    public function profil()
    {
        $user=\Auth::user();

        $member=Member::with('users')->where('users_id',$user->id)->first();
        if($member){
            $member->tgl_lahir=date('Y-m-d', strtotime($member->tgl_lahir));

            return inertia('Member/edit',[
                'member' => $member,
                'auth'=> $user,
            ]);
        }else{
            abort(404);
        }

    }

    public function detail($member){
        $member=Member::with('users')->where('users_id',$member)->first();
        if($member){
            $member->tgl_lahir=date('Y-m-d', strtotime($member->tgl_lahir));
        }

        return inertia('Member/detail',[
            'member' => $member,
            'auth'=> \Auth::user(),
        ]);
    }

    public function update(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($request->users_id)],
            'no_telp' => 'required',
            'tgl_lahir' => 'required',
            'jns_kelamin' => 'required',
            'no_ktp' => 'required|min:16|max:16',
            'photo' => 'nullable|mimes:jpeg,png,jpg,svg|max:1024', 
        ],
        [
            'name.required' => 'Nama Member Tidak Boleh Kosong!',
            'email.required' => 'Email Tidak Boleh Kosong!',
            'email.unique' => 'Email Sudah Digunakan!',
            'no_telp.required' => 'Nomor Telepon Tidak Boleh Kosong!',
            'tgl_lahir.required' => 'Tanggal Lahir Tidak Boleh Kosong!',
            'jns_kelamin.required' => 'Jenis Kelamin Tidak Boleh Kosong!',
            'no_ktp.required' => 'No KTP Tidak Boleh Kosong!',
            'photo.max' => 'Foto Tidak Lebih dari 1Mb',
        ]
        );

 
        $image_path = '';
            $path = storage_path('images/');

            if ($file=$request->hasFile('photo')) {
                $image_path = $request->file('photo')->store('image', 'public');

                Member::where('users_id',$request->users_id)->update(['photo' =>  $image_path,]);
            }

        $user = User::where('id',$request->users_id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $member = Member::where('users_id',$request->users_id)->update([
            'no_telp'=> $request->no_telp,
            'tgl_lahir'=> $request->tgl_lahir['startDate'],
            'jk' => $request->jns_kelamin,
            'no_ktp' => $request->no_ktp,
        ]);
        if(\Auth::user()->is_admin==1){
        return redirect()->route('member.index')->with('message','Data Berhasil Dirubah');
        }else{
            return redirect()->route('member.profil');
        }
    }

    public function delete($id){

        Member::where('users_id',$id)->delete();
        User::where('id',$id)->delete();

        return redirect()->route('member.index')->with('message','Data Berhasil Dihapus');
    }
}
