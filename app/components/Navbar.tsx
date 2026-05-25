import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-xs tracking-tight">IQ</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                    Resume<span className="text-indigo-400">IQ</span>
                </span>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar
