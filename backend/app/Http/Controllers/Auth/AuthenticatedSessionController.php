<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('client.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->route('/');
    }


    public function postlogin(Request $req)
    {

      $validate = $req->validate([
        'email' => 'required|email',
        'password' => 'required|min:6',
    ],
    [
        'email.required' => 'Vui lòng nhập email',
        'email.email' => 'Email không đúng định dạng',
        'password.required' => 'Vui lòng nhập mật khẩu',
        'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
    ]);
      $dataUserLogin=[
        'email'=> $req->email,
        'password'=> $req->password,
      ];
      $remember = $req->has('remember');
      if(Auth::attempt($dataUserLogin,$remember)){
        if(Auth::user()->role=='admin'){
            return redirect()->route('admin.admin');
            // return redirect()->route('/');
        }else  if(Auth::user()->role=='2'){
          // return redirect()->route('nhanvien.nhanvien');
          return redirect()->route('/');
      }else{
          return redirect()->route('/');
        }

      }else{
        return redirect()->back()->with([
           'message'=>'Email hoặc Mật khẩu không đúng vui lòng nhập lại !!' 
        ]);
      }
    }
    


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}