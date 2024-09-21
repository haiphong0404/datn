<?php

namespace App\Http\Controllers;

use App\AdminTest;
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

    public function indexx()
    {
        return view('client.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminTestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
 
}