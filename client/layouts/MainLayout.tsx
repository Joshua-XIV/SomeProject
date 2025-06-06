import { useEffect, useState } from "react"
import{ThemeContext} from '../contexts/ThemeContext'
import {Outlet} from "react-router-dom"
import Background from '../components/Background'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'


const MainLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [theme, setTheme] = useState< 0 | 1 >(() => {
    // Load from localStorage or default to 'light'
    const saved = localStorage.getItem('theme');
    if (saved === '0' || saved === '1') {
      return Number(saved) as 0 | 1;
    }
    return 1; // default to dark
  });

  // Set on theme change
  useEffect(() => {
    localStorage.setItem('theme', theme.toString());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Background/>
      <NavBar/>
      <div className="pt-[4em]">
        {<SideBar action={() => setSideBarOpen(prev => !prev)} sideBarOpen={sideBarOpen}/>}
        <div 
          style={{
            paddingLeft: sideBarOpen ? '16rem' : '4rem',
            transition: 'padding-left 0.5s ease'
          }}><Outlet/>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default MainLayout