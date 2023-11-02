<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => 'required',
            'no_telp' => 'required',
            'tgl_lahir' => 'required',
            'jns_kelamin' => 'required',
            'no_ktp' => 'required|min:16|max:16',
            'photo' => 'required|image|mimes:jpeg,jpg,png,gif,svg|max:1024', 
        ],
        [
            'name.required' => 'Nama Member Tidak Boleh Kosong!',
            'email.required' => 'Email Tidak Boleh Kosong!',
            'email.unique' => 'Email Sudah Digunakan!',
            'password.required' => 'Password Tidak Boleh Kosong!',
            'password_confirmation.required' => 'Password Konfirmasi Tidak Boleh Kosong!',
            'no_telp.required' => 'Nomor Telepon Tidak Boleh Kosong!',
            'tgl_lahir.required' => 'Tanggal Lahir Tidak Boleh Kosong!',
            'jns_kelamin.required' => 'Jenis Kelamin Tidak Boleh Kosong!',
            'no_ktp.required' => 'No KTP Tidak Boleh Kosong!',
            'photo.required' => 'Foto Tidak Boleh Kosong!',

        ]
    );

        $image_path = '';
        $path = storage_path('images/');

        if ($file=$request->hasFile('photo')) {
            $image_path = $request->file('photo')->store('image', 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $member = Member::create([
            'users_id'=> $user->id,
            'no_telp'=> $request->no_telp,
            'tgl_lahir'=> $request->tgl_lahir['startDate'],
            'jk' => $request->jns_kelamin['value'],
            'no_ktp' => $request->no_ktp,
            'photo' =>  $image_path,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
