<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddlware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
          if(Auth::user()->role== 'admin'){
           return $next($request);
           }else{
            return  redirect()->route('login');
          }
        }else{
            return redirect()->route('404')->with([
                'message'=>"Bạn phải đăng nhập vào !!"
            ]);
        }
        
    }
}
