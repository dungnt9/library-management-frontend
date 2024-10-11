import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TrangChu from './pages/TrangChu';
import QLBanDoc from './pages/QLBanDoc';
import QLSach from './pages/QLSach';
import QLMuonTra from './pages/QLMuonTra';
import DefaultLayout from './layouts/index.js';

const routes = [
  { path: '/', component: TrangChu },
  { path: '/ql_ban_doc', component: QLBanDoc },
  { path: '/ql_muon_tra', component: QLMuonTra },
  { path: '/ql_sach', component: QLSach }
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route 
              path={path} 
              element={
                <DefaultLayout>
                  <Component />
                </DefaultLayout>
              } 
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
