<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminTestRequest;
use App\Http\Requests\UpdateAdminTestRequest;

class AdminTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function indexStaff()
    {
        return view('staff.index');
    }

}
