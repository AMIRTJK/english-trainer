import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useLocation } from 'react-router-dom';
import { getLevelMeta } from '@content/registry';
import { useApp } from './store/app-store';
import './app-shell.css';
const NAV = [
    { to: '/', label: 'Dashboard', icon: '◧' },
    { to: '/tests', label: 'Tests', icon: '◆' },
    { to: '/topics', label: 'Topics', icon: '☰' },
    { to: '/progress', label: 'Progress', icon: '◔' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
];
export function AppShell({ children }) {
    const { user } = useApp();
    const location = useLocation();
    const levelName = getLevelMeta(user?.profile.activeLevelId ?? '')?.name ?? '—';
    // The test runner takes over the screen so nothing distracts from the paper.
    const bare = location.pathname === '/test/run';
    if (bare)
        return _jsx("main", { children: children });
    return (_jsxs("div", { className: "shell", children: [_jsx("header", { className: "shell-top", children: _jsxs("div", { className: "shell-top-inner", children: [_jsxs("div", { className: "row", style: { gap: 10 }, children: [_jsx("span", { className: "brand", children: "English File Trainer" }), _jsx("span", { className: "pill pill-accent", children: levelName })] }), _jsx("span", { className: "small dim", children: user?.profile.name })] }) }), _jsx("nav", { className: "shell-nav", "aria-label": "Main", children: NAV.map((item) => (_jsxs(NavLink, { to: item.to, end: item.to === '/', className: ({ isActive }) => `shell-nav-item${isActive ? ' is-active' : ''}`, children: [_jsx("span", { "aria-hidden": "true", className: "shell-nav-icon", children: item.icon }), _jsx("span", { children: item.label })] }, item.to))) }), _jsx("main", { children: children })] }));
}
