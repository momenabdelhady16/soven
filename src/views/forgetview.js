export function forgetView() {
    return `
        <section
            class="flex justify-center items-center p-[11px] w-full h-screen box-border bg-[#000608]"
        >
            <div
            class="flex flex-col p-[24px] lg:py-[106px] gap-[48px] items-center bg-[#F5F5F2] w-full h-[70vh] box-border rounded-4xl md:3/4 lg:w-4/5 xl:w-[52%]"
            >
            <img
                src="./assets/SOVEN_logo_000608.svg"
                alt="logo"
                class="w-[150px] md:w-[200px] self-start lg:hidden"
            />
            <div class="w-[min(448px,80%)] flex flex-col justify-between h-full">
                <h2
                class="text-[clamp(48px,10vw,85px)] md:text-[85px] leading-[100%] text-[#111311]"
                >
                Reset Your Password.
                </h2>
                <form class="flex flex-col gap-7" id="login-form">
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-[#464744] text-[12px]"
                    >Email Address</label
                    >
                    <input
                    form="login-form"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    class="w-full bg-white rounded-lg border-mauve-300 border-1 p-3 focus:outline-emerald-400"
                    />
                </div>
                <button
                    id="login"
                    class="w-full py-3 rounded-md text-lg font-bold mt-4 bg-[#111311] hover:bg-[#222422] text-white cursor-pointer hover:scale-[1.02] ease-in-out transition-all"
                >
                    Send Code
                </button>
                <div class="flex justify-between w-full items-center">
                    <div class="flex justify-center gap-1">
                    <span class="text-[12px] text-[#464744]">New To Common?</span>
                    <a
                        href="#/register"
                        class="text-[12px] font-[600] underline underline-offset-4"
                        >Create an account</a
                    >
                    </div>
                </div>
                </form>
            </div>
            </div>
        </section>
    `
}
