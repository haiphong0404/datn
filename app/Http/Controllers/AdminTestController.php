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
    public function show(AdminTest $adminTest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdminTest $adminTest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminTestRequest $request, AdminTest $adminTest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdminTest $adminTest)
    {
        //
    }
}