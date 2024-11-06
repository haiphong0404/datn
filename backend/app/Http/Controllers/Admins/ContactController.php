<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return view('admin.contacts.index', compact('contacts'));
    }

    public function create()
    {
        return view('admin.contacts.create');
    }

    // Lưu thông tin liên hệ mới
    public function store(ContactRequest $request )
    {
        Contact::create($request->all());
        return redirect()->route('admin.contacts.index')->with('success', 'Liên hệ đã được tạo thành công.');
    }

    public function edit(Contact $contact)
    {
        return view('admin.contacts.edit', compact('contact'));
    }

    // Cập nhật thông tin liên hệ
    public function update(UpdateContactRequest $request, $id )
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        return redirect()->route('admin.contacts.index')->with('success', 'Liên hệ đã được cập nhật thành công.');
    }

    // Xóa liên hệ
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Liên hệ đã được xóa thành công.');
    }
}
