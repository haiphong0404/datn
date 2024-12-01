<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10); // Mặc định 10 bản ghi mỗi trang
    
        $contacts = Contact::when($search, function ($query, $search) {
                return $query->where('name','LIKE', "%{$search}%")
                         ->orWhere('email', 'LIKE', "%{$search}%")
                         ->orWhere('phone', 'LIKE', "%{$search}%");
        })
        ->orderBy('created_at', 'desc') // Sắp xếp theo thời gian tạo mới nhất
        ->paginate($perPage);

    $noResults = $contacts->isEmpty(); // Kiểm tra nếu không có kết quả

    return view('admin.contacts.index', compact('contacts', 'noResults'));
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
