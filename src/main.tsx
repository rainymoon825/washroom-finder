import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import washrooms from './data/public-washrooms.json';
import users from './data/users.json';
import reviews from './data/reviews.json';

localStorage.setItem("washroomlist", JSON.stringify(washrooms));
localStorage.setItem("userlist", JSON.stringify(users));
localStorage.setItem("reviewlist", JSON.stringify(reviews));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
