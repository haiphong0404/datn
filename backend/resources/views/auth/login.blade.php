<x-guest-layout>
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />
        @if (session('success'))
            <div class="mb-4 text-sm text-green-600 font-semibold">
                {{ session('success') }}
            </div>
        @endif

        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">{{ __('Welcome Back') }}</h2>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div class="mb-4">
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-2 w-full rounded-lg border-gray-300" type="email" name="email"
                    :value="old('email')" required autofocus autocomplete="username" />
                <x-input-error :messages="$errors->get('email')" class="mt-2 text-red-500 text-sm" />
            </div>

            <!-- Password -->
            <div class="mb-4">
                <x-input-label for="password" :value="__('Password')" />
                <x-text-input id="password" class="block mt-2 w-full rounded-lg border-gray-300" type="password"
                    name="password" required autocomplete="current-password" />
                <x-input-error :messages="$errors->get('password')" class="mt-2 text-red-500 text-sm" />
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between mb-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                    <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                </label>

                @if (Route::has('password.request'))
                    <a class="text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif
            </div>

            <!-- Submit Buttons -->
            <div class="flex items-center justify-between">
                <x-primary-button class="bg-indigo-600 hover:bg-indigo-700 w-full py-2 text-white rounded-lg font-semibold transition duration-150 ease-in-out">
                    {{ __('Log in') }}
                </x-primary-button>
            </div>
        </form>

        <!-- Additional Links -->
        <div class="text-center mt-6">
            <p class="text-sm text-gray-600">{{ __('New to the platform?') }}
                <a href="{{ route('register') }}" class="text-indigo-600 hover:underline font-medium">
                    {{ __('Sign up') }}
                </a>
            </p>
            <a href="http://localhost:3000"
                class="mt-3 inline-block text-sm text-gray-600 hover:text-gray-900 font-medium underline">
                {{ __('Back to Client') }}
            </a>
        </div>
    </div>
</x-guest-layout>
