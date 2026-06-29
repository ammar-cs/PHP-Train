import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseDetailPage from './pages/CaseDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case/:id" element={<CaseDetailPage />} />
    </Routes>
  )
}
