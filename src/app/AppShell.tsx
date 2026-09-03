import { useEffect, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getLevelMeta } from '@content/registry';
import { useTheme } from '@/shared/lib/use-theme';
import { ScrollToTopButton } from '@/shared/ui/ScrollToTopButton';
import { useApp } from './store/app-store';
import './app-shell.css';

const NAV = [
  { to: '/', label: 'Dashboard', icon: '◧' },
  { to: '/tests', label: 'Tests', icon: '◆' },
  { to: '/topics', label: 'Topics', icon: '☰' },
  { to: '/vocabulary', label: 'Vocabulary', icon: '📖' },
  { to: '/progress', label: 'Progress', icon: '◔' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

export function AppShell({ children }: { children: ReactNode }): JSX.Element {
  const { user } = useApp();
  const location = useLocation();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const levelName = getLevelMeta(user?.profile.activeLevelId ?? '')?.name ?? '—';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // The test runner takes over the screen so nothing distracts from the paper.
  const bare = location.pathname === '/test/run';

  if (bare) return <main>{children}</main>;

  return (
    <div className="shell">
      <header className="shell-top">
        <div className="shell-top-inner">
          <div className="row" style={{ gap: 10 }}>
            <span className="brand">English File Trainer</span>
            <span className="pill pill-accent">{levelName}</span>
          </div>
          <div className="row" style={{ gap: 12 }}>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Current theme: ${theme} (click to toggle)`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </button>
            <span className="small dim">{user?.profile.name}</span>
          </div>
        </div>
      </header>

      {/* Nav comes before main in the DOM for screen readers; on small screens
          it is fixed to the bottom of the viewport, so the order still reads right. */}
      <nav className="shell-nav" aria-label="Main">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `shell-nav-item${isActive ? ' is-active' : ''}`}
          >
            <span aria-hidden="true" className="shell-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <main>{children}</main>
      <ScrollToTopButton />
    </div>
  );
}
