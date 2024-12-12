<x-guest-layout>
    <div
        class="max-w-md mx-auto mt-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 p-8 rounded-lg shadow-xl border border-gray-300">
        <div class="flex flex-col sm:justify-center items-center mb-5">
            <a href="/">
                <img src="{{ asset('assets/admin/img/logo.png') }}" alt="">
            </a>
        </div>

        <div class="mb-4 text-sm text-white-600">
            <p class="text-white">Quên mật khẩu? Không vấn đề gì. Chỉ cần cho chúng tôi biết địa chỉ email của bạn và
                chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu cho phép bạn chọn mật khẩu mới.</p>
        </div>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <x-input-label class="text-white" for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')"
                    required autofocus />
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>

            <div class="flex items-center justify-between mt-4 space-x-4">
                <!-- Nút gửi link reset password -->
                <x-primary-button
                    class="w-full py-2 px-4 bg-indigo-700 text-white flex justify-center items-center rounded-md font-semibold text-lg 
                    hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                    transition ease-in-out duration-150">
                    {{ __('Gửi đi') }}
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
