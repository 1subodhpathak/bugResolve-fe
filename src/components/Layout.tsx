import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  Home, 
  GitBranch, 
  AlertCircle, 
  CheckCircle, 
  GitPullRequest,
  GitFork,
  LogOut,
  Sparkles,
  Search,
  Command,
  ChevronDown,
  ChevronRight,
  Bell
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Repositories', href: '/repositories', icon: GitBranch },
    { name: 'Issues', href: '/issues', icon: AlertCircle },
    { name: 'Contribute', href: '/contribute', icon: GitFork },
    { name: 'Validations', href: '/validations', icon: CheckCircle },
    { name: 'Pull Requests', href: '/pull-requests', icon: GitPullRequest },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50/30">
      {/* Full-Width Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          
          {/* Left: Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <Sparkles className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold gradient-text-primary">Bug Resolve</span>
          </Link>

          {/* Right: Search + Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Enhanced Search */}
            <button className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 min-w-[200px] md:min-w-[280px]">
              <Search size={18} />
              <span className="text-sm text-gray-400 flex-1 text-left hidden md:inline">Search issues, repos...</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm">
                <Command size={10} />K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all group">
              <Bell size={20} />
              {/* Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              {/* Tooltip on hover */}
              <span className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Notifications
              </span>
            </button>

            {/* User Profile with Dropdown Arrow */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-9 h-9 rounded-full border-2 border-green-500"
                  />
                  <span className="hidden md:block text-sm font-semibold text-gray-900">{user.username}</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          Profile Settings
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          Preferences
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          Keyboard Shortcuts
                        </button>
                      </div>
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={logout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut size={14} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Collapsible Sidebar */}
        <aside
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
          className={`fixed left-0 top-[65px] h-[calc(100vh-65px)] bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-40 ${
            sidebarExpanded ? 'w-56' : 'w-16'
          }`}
        >
          <nav className="py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              
              return (
                <div key={item.name} className="relative group/item">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span 
                      className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                        sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && !sidebarExpanded && (
                      <div className="absolute left-0 w-1 h-8 bg-green-600 rounded-r-full" />
                    )}
                  </Link>
                  
                  {/* Tooltip when sidebar is collapsed */}
                  {!sidebarExpanded && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Expand/Collapse Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className={`flex items-center gap-2 text-xs text-gray-400 transition-all duration-300 ${
              sidebarExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              <ChevronRight size={14} />
              <span>Hover to expand</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarExpanded ? 'ml-56' : 'ml-16'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            {children}
          </div>

          {/* Footer */}
          <footer className="max-w-[1400px] mx-auto px-6 py-6 mt-12">
            <div className="text-center text-gray-400 text-xs">
              © 2025 Bug Resolve • Made with ❤️ for developers
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
