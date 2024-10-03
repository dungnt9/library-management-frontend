//C:\Users\dung9\Desktop\front\src\App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TrangChu from './pages/TrangChu';
import QLBanDoc from './pages/QLBanDoc';
import QLSach from './pages/QLSach';
import QLMuonTra from './pages/QLMuonTra';
import DefaultLayout from './layouts/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
              <DefaultLayout>
                <TrangChu />
              </DefaultLayout>
            }
          >
            {' '}
          </Route>
          <Route path="/ql_ban_doc" element={
              <DefaultLayout>
                <QLBanDoc />
              </DefaultLayout>
            }
          >
            {' '}
          </Route>
          <Route path="/ql_muon_tra" element={
              <DefaultLayout>
                <QLMuonTra />
              </DefaultLayout>
            }
          >
            {' '}
          </Route>
          <Route path="/ql_sach" element={
              <DefaultLayout>
                <QLSach />
              </DefaultLayout>
            }
          >
            {' '}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;