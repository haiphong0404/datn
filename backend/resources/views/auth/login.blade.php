<x-guest-layout>
    <!-- Session Status -->
    {{-- <x-auth-session-status class="mb-4" :status="session('status')" /> --}}
    @if (session('status'))
        <script>
            alert(" {{ session('status') }}");
        </script>
    @endif
    @if (session('success'))
        <script>
            alert(" {{ session('success') }}");
        </script>
    @endif
    @if (session('error'))
        <script>
            alert("{{ session('error') }}");
        </script>
    @endif

    <div
        class="max-w-md mx-auto mt-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 p-8 rounded-lg shadow-xl border border-gray-300">
        <div class="flex flex-col sm:justify-center items-center mb-5">
            <a href="/">
                <img src="{{ asset('assets/admin/img/logo.png') }}" alt="">
            </a>
        </div>
        {{-- <h2 class="text-3xl font-bold text-center text-white mb-6">Welcome <a href="/">
                    <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
                </a></h2> --}}
        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div class="mb-6">
                <x-input-label class="text-white" for="email" :value="__('Email')" />
                <x-text-input id="email"
                    class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="email" name="email" :value="old('email')" autofocus autocomplete="username" />
                <x-input-error :messages="$errors->get('email')"
                    class="mt-2 text-sm text-red-600 bg-red-100 border border-red-500 rounded-md p-2 shadow-md" />
            </div>

            <!-- Password -->
            <div class="mb-6">
                <x-input-label class="text-white" for="password" :value="__('Password')" />
                <x-text-input id="password"
                    class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="password" name="password" autocomplete="current-password" />
                <x-input-error :messages="$errors->get('password')"
                    class="mt-2 text-sm text-red-600 bg-red-100 border border-red-500 rounded-md p-2 shadow-md" />
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between mb-4">
                <label for="remember_me" class="inline-flex items-center text-sm text-white">
                    <input id="remember_me" type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                    <span class="ms-2">{{ __('Remember me') }}</span>
                </label>

                @if (Route::has('password.request'))
                    <a class="text-sm text-white hover:text-indigo-300" href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
                <x-primary-button
                    class="w-full py-3 px-4 bg-indigo-700 text-white rounded-md font-semibold text-lg flex justify-center items-center hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    {{ __('Log in') }}
                </x-primary-button>
            </div>



            <!-- Back to Client Link -->
            <div class="mt-4 text-center">
                <a href="http://localhost:3000" class="text-white hover:text-indigo-300 text-sm">
                    {{ __('Back to Client') }}
                </a>
            </div>
        </form>
    </div>
</x-guest-layout>
