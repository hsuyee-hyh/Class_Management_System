export default function AccountLayout({ children }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-svh ">
                <div
                    className="col-span-12 md:col-span-7 
                flex flex-col justify-center items-center 
                "
                >
                    {children}
                </div>
                <div
                    className="hidden md:col-span-5 md:flex justify-center items-center
                 mr-28"
                >
                    <img
                        src="storage/login/login2.avif"
                        alt="login_img"
                        className="w-[600px] h-[600px] p-5"
                    />
                </div>
            </div>
        </>
    );
}
