import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './store/app-store';
import { AppShell } from './AppShell';
import { OnboardingPage } from '@/pages/onboarding/OnboardingPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
// Route-level code splitting (Performance.md §6). The dashboard is the entry
// point and stays in the main chunk.
const TestSelectPage = lazy(() => import('@/pages/test-select/TestSelectPage'));
const TestRunnerPage = lazy(() => import('@/pages/test-runner/TestRunnerPage'));
const ResultsPage = lazy(() => import('@/pages/results/ResultsPage'));
const TopicsPage = lazy(() => import('@/pages/topics/TopicsPage'));
const ProgressPage = lazy(() => import('@/pages/progress/ProgressPage'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
function Loading() {
    return _jsx("div", { className: "page dim", children: "Loading\u2026" });
}
function Router() {
    const { user } = useApp();
    if (!user)
        return _jsx(OnboardingPage, {});
    return (_jsx(AppShell, { children: _jsx(Suspense, { fallback: _jsx(Loading, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/tests", element: _jsx(TestSelectPage, {}) }), _jsx(Route, { path: "/test/run", element: _jsx(TestRunnerPage, {}) }), _jsx(Route, { path: "/results/:attemptId", element: _jsx(ResultsPage, {}) }), _jsx(Route, { path: "/topics", element: _jsx(TopicsPage, {}) }), _jsx(Route, { path: "/progress", element: _jsx(ProgressPage, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }));
}
export function App() {
    return (_jsx(AppProvider, { children: _jsx(HashRouter, { children: _jsx(Router, {}) }) }));
}
