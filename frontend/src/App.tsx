import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/TopBar';
import Tickets from './pages/tickets/Tickets';
import Insights from './pages/Insights';
import Contacts from './pages/Contacts';
import Budget from './pages/Budget';
import Inbox from './pages/Inbox';
import Create from './pages/Create';
import Organize from './pages/Organize';
import Workflow from './pages/Workflow';
import Data from './pages/Data';
import AI from './pages/AI';
import Costs from './pages/Costs';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { AnimatePresence } from 'motion/react';
import AniamtedRouteParent from './Components/AniamtedRouteParent';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col bg-blue-800 w-svw min-h-svh">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <div className="bg-white rounded-tl-2xl w-full max-h-full overflow-scroll text-black">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/tickets" replace />} />
              <Route
                path="/tickets"
                element={
                  <AniamtedRouteParent>
                    <Tickets />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/insights"
                element={
                  <AniamtedRouteParent>
                    <Insights />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/contacts"
                element={
                  <AniamtedRouteParent>
                    <Contacts />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/inbox"
                element={
                  <AniamtedRouteParent>
                    <Inbox />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/budget"
                element={
                  <AniamtedRouteParent>
                    <Budget />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/create"
                element={
                  <AniamtedRouteParent>
                    <Create />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/organize"
                element={
                  <AniamtedRouteParent>
                    <Organize />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/workflow"
                element={
                  <AniamtedRouteParent>
                    <Workflow />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/ai"
                element={
                  <AniamtedRouteParent>
                    <AI />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/you"
                element={
                  <AniamtedRouteParent>
                    <Data />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/costs"
                element={
                  <AniamtedRouteParent>
                    <Costs />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/reports"
                element={
                  <AniamtedRouteParent>
                    <Reports />
                  </AniamtedRouteParent>
                }
              />
              <Route
                path="/settings"
                element={
                  <AniamtedRouteParent>
                    <Settings />
                  </AniamtedRouteParent>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
