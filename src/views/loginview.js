export function loginView() {
    return `
            <main class="w-full">
                <section
                class="flex justify-center items-center p-[11px] w-full h-screen box-border absolute z-[1000] lg:w-[52%]"
                >
                <div
                    class="flex flex-col p-[24px] lg:py-[96px] gap-[48px] items-center bg-[#F5F5F2] w-full h-full box-border rounded-4xl"
                >
                    <img
                    src="./assets/SOVEN_logo_nav.svg"
                    alt="logo"
                    class="w-[200px] self-start lg:hidden "
                    />
                    <div class="w-[min(448px,80%)] flex flex-col gap-[56px]">
                    <div class="flex flex-col gap-[40px]">
                        <h2
                        class="text-[clamp(48px,10vw,85px)] md:text-[85px] leading-[100%] text-[#111311]"
                        >
                        Welcome Back.
                        </h2>
                        <p
                        class="text-[#777A74] w-[90%] text-[14px]"
                        >
                        Sign in to view your orders, saved finds, and account details.
                        </p>
                    </div>
                    <form class="flex flex-col gap-7" id="login-form">
                        <div class="flex flex-col gap-2">
                        <label for="email"class="text-[#464744] text-[12px]">Email Address</label>
                        <input form="login-form" name="email" id="email" type="email" placeholder="you@example.com" class="w-full bg-white rounded-lg border-mauve-300 border-1 p-3 focus:outline-emerald-400"/>
                        </div>
                        <div class="flex flex-col gap-2">
                        <label for="password"class="text-[#464744] text-[12px]">Password</label>
                        <input form="login-form" name="password" id="password" type="password" placeholder="Enter Yout Password" class="w-full bg-white rounded-lg border-mauve-300 border-1 p-3 focus:outline-emerald-400"/>
                        </div>
                        <button id="login" class="w-full py-3 rounded-md text-lg font-bold mt-4 bg-[#111311] hover:bg-[#222422] text-white cursor-pointer hover:scale-[1.02] ease-in-out transition-all">Sign In</button>
                        <div class="flex justify-between w-full items-center">
                        <a href="#/reset-password" class="text-[12px] font-[600] text-[#111311] underline underline-offset-4">Forget Password?</a>
                        <div class="flex justify-center gap-1">
                        <span class="text-[12px] text-[#464744]">New To Common?</span>
                        <a href="#/register" class="text-[12px] font-[600] underline underline-offset-4">Create an account</a>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </section>
                <section class="bg-[#000608] w-full h-screen">
                <img
                    src="./assets/main-bg.jpeg"
                    alt="main background"
                    class="w-[50%] h-screen object-cover object-[70%] xl:object-[80%] 2xl:object-[100%] right-0 fixed"
                />
                </section>
            </main>
    `
}
