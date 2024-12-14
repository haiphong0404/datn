<x-guest-layout>
    <div
    class="max-w-md mx-auto mt-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 p-8 rounded-lg shadow-xl border border-gray-300">
    <div class="flex flex-col sm:justify-center items-center mb-5">
        <a href="/">
            <img src="{{ asset('assets/admin/img/logo.png') }}" alt="">
        </a>
    </div>
    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label class="text-white" for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email"
                :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label class="text-white" for="password" :value="__('Password')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label class="text-white" for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password"
                name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        {{-- <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Reset Password') }}
            </x-primary-button>
        </div> --}}
        <div class="flex items-center justify-between mt-5 space-x-4">
            <!-- Nút gửi link reset password -->
            <x-primary-button
                class="w-full py-2 px-4 bg-indigo-700 text-white flex justify-center items-center rounded-md font-semibold text-lg 
                hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                transition ease-in-out duration-150">
                {{ __('Reset Password') }}
            </x-primary-button>

            <!-- Nút reset -->
            <x-primary-button type="reset"
                class="w-full py-2 px-4 bg-[#3E2723] text-white flex justify-center items-center rounded-md font-semibold text-lg 
                hover:bg-[#2C1B16] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                transition ease-in-out duration-150">
                {{ __('Nhập lại') }}
            </x-primary-button>
        </div>
    </form>
    </div>
</x-guest-layout>