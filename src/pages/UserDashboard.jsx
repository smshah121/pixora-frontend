import React, { useEffect } from 'react'
import Searchbar from '../components/Searchbar'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useNavigate } from 'react-router-dom'
import { clearToken, setToken } from '../feature/auth/authSlice'
import { setQuery } from '../feature/searchSlice'
import { CgProfile } from "react-icons/cg";
import { resetAllApiStates } from '../app/store'

const UserDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { query } = useSelector((store) => store.search)
    const { token } = useSelector((store) => store.auth)

    // 1️⃣ Check login token on dashboard load
    useEffect(() => {
        // Read token from Redux first, fallback to localStorage
        const savedToken = token || localStorage.getItem("access_token")
        if (!savedToken) {
            // If no token, redirect to login
            navigate("/")
        } else {
            // Save token in Redux if it's in localStorage
            if (!token) dispatch(setToken(savedToken))
        }
    }, [token, dispatch, navigate])

    const handleLogout = () => {
        dispatch(clearToken())
        resetAllApiStates()
        localStorage.removeItem("access_token") // also clear localStorage
        navigate("/")
    }

    // Quick search suggestions
    const quickSearches = [
        { emoji: "🎨", label: "Art & Design", query: "modern art" },
        { emoji: "🏠", label: "Home Decor", query: "interior design" },
        { emoji: "🍕", label: "Food Ideas", query: "food recipes" },
        { emoji: "✈️", label: "Travel", query: "travel destinations" },
        { emoji: "💪", label: "Fitness", query: "workout ideas" },
        { emoji: "👗", label: "Fashion", query: "fashion style" },
        { emoji: "📱", label: "Tech", query: "technology" },
        { emoji: "🐱", label: "Animals", query: "cute animals" }
    ]

    const trendingTopics = [
        { title: "Spring Fashion 2024", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400" },
        { title: "Modern Kitchen Ideas", image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400" },
        { title: "Travel Photography", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
        { title: "Minimalist Design", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400" }
    ]

    return (
        <div className='bg-white min-h-screen'>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                    {/* LOGO */}
                    <div
                        onClick={() => navigate("/user-dashboard")}
                        className="cursor-pointer flex items-center gap-2 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e60023] to-[#ff4458] flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all">
                            P
                        </div>
                        <h1 className="text-[#e60023] font-bold text-xl group-hover:scale-105 transition-transform">
                            Pixora
                        </h1>
                    </div>

                    {/* SEARCH */}
                    <div className="flex-1 max-w-2xl hidden md:block">
                        <Searchbar />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        <button onClick={()=> navigate("/profile")}><CgProfile className='text-[#e60023]' size={32}/></button>
                        <button
                            onClick={() => navigate("/collection")}
                            className="flex items-center gap-2 bg-[#e60023] hover:bg-[#d01f1f] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            📁 Collections
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 rounded-full border border-red-200 font-semibold text-[#e60023] hover:bg-red-50 transition text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* MOBILE SEARCH */}
                <div className="px-4 pb-3 md:hidden">
                    <Searchbar />
                </div>
            </nav>

            {/* Main Content */}
            <section className='max-w-7xl mx-auto px-6 py-8'>
                {query !== "" ? (
                    <div>
                        <Tabs />
                        <ResultGrid />
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <div className='mb-12 space-y-4'>
                            <div className='inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4'>
                                <span className='text-2xl'>✨</span>
                                <span className='text-sm font-medium text-[#e60023]'>Start Exploring</span>
                            </div>
                            
                            <h2 className='text-5xl md:text-6xl font-bold text-[#111] leading-tight'>
                                What will you
                                <br />
                                <span className='text-[#e60023] relative inline-block'>
                                    discover today?
                                    <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                                        <path d="M2 10C60 4 140 4 198 10" stroke="#e60023" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                                    </svg>
                                </span>
                            </h2>
                            <p className='text-xl text-[#333] max-w-2xl mx-auto'>
                                Search for ideas, save what you love, and create your perfect collections
                            </p>
                        </div>

                        {/* Quick Search Buttons */}
                        <div className='mb-16'>
                            <h3 className='text-lg font-semibold text-[#111] mb-6'>Popular searches</h3>
                            <div className='flex flex-wrap justify-center gap-3 max-w-4xl mx-auto'>
                                {quickSearches.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => dispatch(setQuery(item.query))}
                                        className='flex items-center gap-2 px-5 py-3 bg-white border border-red-100 rounded-full hover:border-[#e60023] hover:bg-red-50 hover:shadow-md transition-all group'
                                    >
                                        <span className='text-2xl group-hover:scale-110 transition-transform'>{item.emoji}</span>
                                        <span className='font-medium text-[#333] group-hover:text-[#e60023] transition-colors'>
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending Section */}
                        <div className='mb-12'>
                            <div className='flex items-center justify-center gap-2 mb-6'>
                                <span className='text-2xl'>🔥</span>
                                <h3 className='text-lg font-semibold text-[#111]'>Trending Now</h3>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto'>
                                {trendingTopics.map((topic, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => dispatch(setQuery(topic.title))}
                                        className='group relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105'
                                    >
                                        <img 
                                            src={topic.image} 
                                            alt={topic.title}
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
                                        <div className='absolute bottom-0 left-0 right-0 p-4'>
                                            <h4 className='text-white font-semibold text-sm'>{topic.title}</h4>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default UserDashboard
