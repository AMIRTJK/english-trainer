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

function Loading(): JSX.Element {
  return <div className="page dim">Loading…</div>;
}

function Router(): JSX.Element {
  const { user } = useApp();
  if (!user) return <OnboardingPage />;

  return (
    <AppShell>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tests" element={<TestSelectPage />} />
          <Route path="/test/run" element={<TestRunnerPage />} />
          <Route path="/results/:attemptId" element={<ResultsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export function App(): JSX.Element {
  return (
    <AppProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </AppProvider>
  );
}
