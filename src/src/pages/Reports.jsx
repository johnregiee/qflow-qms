ksdnknsdjkncjksdjkchs
import Navbar from '../components/Navbar.jsx'
// Note: Ensure lucide-react is installed by running `npm install lucide-react` in your terminal
import { SlidersHorizontal, SquarePen } from 'lucide-react';

function ReportsPage({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  isNotificationsOpen,
  onToggleNotifications,
}) {
  return (
    <main className="dashboard">
      {/* Keep your team's original Navbar intact so routing and modals work perfectly */}
      <Navbar
        activePage={activePage}
        onPageChange={onPageChange}
        isUserMenuOpen={isUserMenuOpen}
        onToggleMenu={onToggleMenu}
        onLogout={onLogout}
        isNotificationsOpen={isNotificationsOpen}
        onToggleNotifications={onToggleNotifications}
      />

      {/* --- REPLACED CHARTS LAYER WITH YOUR GLOWING DESIGN LAYOUT --- */}
      <div className="relative mx-auto flex w-full max-w-[1440px] px-6 py-6" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        
        {/* Left Spacer Column (Positions the layout exactly like the wireframe frame) */}
        <div className="hidden w-[15%] lg:block" />

        {/* Central Workspace Canvas */}
        <div className="relative flex flex-1 flex-col items-center px-4">
          
          {/* Ambient Particle Glow Accents */}
          <div className="absolute left-[-10%] top-[20%] h-48 w-48 rounded-full bg-cyan-500/10 blur-[70px] pointer-events-none" />
          <div className="absolute right-[0%] bottom-[15%] h-36 w-36 rounded-full bg-cyan-400/10 blur-[60px] pointer-events-none" />

          {/* Action Filter Slider Button */}
          <div className="mb-4 w-full max-w-3xl flex justify-start">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-[#0d1b31]/90 text-slate-400 hover:bg-[#132644] hover:text-slate-100 transition-colors">
              <SlidersHorizontal size={15} />
            </button>
          </div>

          {/* Main Translucent Glassmorphic Content Card */}
          <div className="relative w-full max-w-3xl rounded-xl border border-white/10 bg-[#0d1a2d]/60 p-6 backdrop-blur-md shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">
            
            {/* Meta Header Meta-Row block */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-slate-500/80 border border-white/5" />
                <div className="flex flex-col">
                  <h3 className="text-xs font-medium text-slate-100">Name of the User</h3>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mt-0.5">
                    <span>Position</span>
                    <span className="opacity-40">•</span>
                    <span>Location</span>
                    <span className="opacity-40">•</span>
                    <span>Date and Time</span>
                  </div>
                </div>
              </div>
              
              {/* Context Tag Controls */}
              <div className="flex space-x-1.5">
                <span className="rounded bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-medium text-slate-300">Status</span>
                <span className="rounded bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-medium text-slate-300">Day</span>
              </div>
            </div>

            {/* Document Vector Graphical Content Frame */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium tracking-wide text-slate-300">Details</h4>
              
              {/* Media File frame layout canvas container */}
              <div className="relative flex aspect-[16/9] w-full items-end justify-end rounded-lg border border-white/5 bg-[#081223]/50 overflow-hidden">
                
                {/* SVG Crossing Line Accent design layout wireframe indicators */}
                <svg className="absolute inset-0 h-full w-full stroke-white/[0.02]" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="0" y1="100%" x2="100%" y2="0" />
                </svg>

                {/* Subdued Graphic Wave Chart Accent Layer */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-25">
                  <svg viewBox="0 0 1440 320" className="w-full h-full fill-none stroke-cyan-400" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,192L120,202.7C240,213,480,235,720,218.7C960,203,1200,149,1320,122.7L1440,96" />
                  </svg>
                </div>

                {/* Internal UI Layer Labels */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <span className="text-xs font-medium tracking-wide text-cyan-400/90 mb-1">Details</span>
                  <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-cyan-500/50 rounded-full" />
                  </div>
                </div>

                {/* Interactive Action Edit Pen element */}
                <button className="m-3 relative z-10 text-cyan-400 hover:text-cyan-300 p-1 rounded transition-colors">
                  <SquarePen size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Interaction Panel Actions Section */}
        <div className="flex w-[20%] flex-col justify-end pl-4 pb-2">
          <button className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-2.5 text-xs font-medium text-white shadow-[0_4px_15px_rgba(6,182,212,0.2)] hover:opacity-95 transition-opacity active:scale-[0.98]">
            Submit a Report
          </button>
        </div>

      </div>
    </main>
  )
}

export default ReportsPage