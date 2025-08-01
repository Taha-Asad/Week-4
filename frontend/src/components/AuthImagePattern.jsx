const AuthImagePattern = ({ title, subtitle }) => {
    return (

        <div className="hidden pt-10 lg:flex justify-center items-center bg-base-200 pl-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {
                        [...Array(9)].map((_, i) => {
                            return (
                                <div key={i} className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""}`} />
                            )
                        })
                    }
                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>

    )
}
export default AuthImagePattern;