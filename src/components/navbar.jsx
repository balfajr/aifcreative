import { useState, useEffect, useRef } from 'react'; // 1. Impor useEffect dan useRef
import { Link } from 'react-router-dom';
import Logo from '../assets/AIF-Logo.svg';
import { FaInstagram } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  // State untuk hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- 2. State dan Ref untuk kontrol scroll ---
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- 3. Logika untuk mengontrol visibilitas navbar saat scroll ---
  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    // Tampilkan/sembunyikan navbar
    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      setShowNavbar(false); // Sembunyikan saat scroll ke bawah
    } else {
      setShowNavbar(true); // Tampilkan saat scroll ke atas
    }

    // Ubah background saat scroll sudah melewati 50px
    setIsScrolled(currentScrollY > 50);

    // Update posisi scroll terakhir
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);


  return (
    <>
      {/* --- 4. Elemen nav dengan class dinamis untuk scroll --- */}
      <nav className={`fixed top-0 w-full backdrop-blur-sm shadow-sm z-50 transition-transform duration-300
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'bg-black/20' : 'bg-transparent'}
      `}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => isMenuOpen && toggleMenu()}>
                <img src={Logo} alt="AIF Logo" className="h-8 md:h-12" />
              </Link>
            </div>
            <div className="flex items-center">
              <button onClick={toggleMenu} className="text-cream focus:outline-none z-50">
                {isMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Panel Menu Geser (tetap sama) --- */}
      <div
        className={`fixed top-0 left-0 w-full min-h-[100dvh] min-h-dvh bg-black text-cream/70 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col text-center uppercase space-y-8">
          <Link to="/" className="text-3xl font-semibold hover:text-cream transition-colors" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/works" className="text-3xl font-semibold hover:text-cream transition-colors" onClick={toggleMenu}>
            Works
          </Link>
          <Link to="/team" className="text-3xl font-semibold hover:text-cream transition-colors" onClick={toggleMenu}>
            Meet Our Team
          </Link>
          <Link to="/contact" className="text-3xl font-semibold hover:text-cream transition-colors" onClick={toggleMenu}>
            Contact
          </Link>
          <div className="w-full h-px bg-gray-700 mx-auto"></div> 
          <a
            href="https://www.instagram.com/aifcreative"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xl hover:text-cream/70 transition-colors"
            onClick={toggleMenu} 
          >
            <FaInstagram className="mr-3" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
