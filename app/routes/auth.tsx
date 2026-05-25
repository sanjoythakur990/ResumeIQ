import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'ResumeIQ | Sign In' },
    { name: 'description', content: 'Sign in to your ResumeIQ account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-screen flex items-center justify-center !pt-0">
            <div className="w-full max-w-md px-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center">
                            <span className="text-white font-black text-sm">IQ</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Resume<span className="text-indigo-400">IQ</span>
                        </span>
                    </div>
                    <h1 className="!text-white !from-white !via-indigo-200 !to-violet-300 text-4xl mb-3">Welcome back</h1>
                    <p className="text-slate-400 text-lg">Sign in to continue your job journey</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-full space-y-3 text-center">
                            <p className="text-slate-300 text-sm">
                                Get AI-powered feedback on your resume and improve your chances of landing your dream job.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 w-full text-slate-400 text-sm">
                            {[
                                "ATS compatibility scoring",
                                "Detailed improvement tips",
                                "Tone, content & structure analysis",
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="w-full pt-2">
                            {isLoading ? (
                                <button className="auth-button mx-auto flex items-center justify-center gap-3 animate-pulse">
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing you in...
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button className="auth-button mx-auto block" onClick={auth.signOut}>
                                            Sign Out
                                        </button>
                                    ) : (
                                        <button className="auth-button mx-auto block" onClick={auth.signIn}>
                                            Sign In with Puter
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    Powered by Puter &amp; Claude AI
                </p>
            </div>
        </main>
    )
}

export default Auth
