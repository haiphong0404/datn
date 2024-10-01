<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Attempt to authenticate the user
        if (Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $user = Auth::user();
            // Optionally generate a token if you're using token-based authentication
            // $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'message' => 'Logged in successfully.',
                'user' => $user, // You may want to customize the user data returned
                // 'token' => $token, // Uncomment if using token-based auth
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials. Please try again.'
        ], 401); // Unauthorized
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(): JsonResponse
    {
        Auth::logout(); // For token-based, you may not need this

        return response()->json(['message' => 'Logged out successfully.']);
    }
}