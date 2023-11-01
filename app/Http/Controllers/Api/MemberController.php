<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;

use App\Http\Resources\MemberResource;

class MemberController extends Controller
{
    public function index()
    {
        //get all member
        $member = Member::latest()->paginate(10);

        //return collection of posts as a resource
        return new MemberResource(true, 'List Data Member', $member);
    }
}
