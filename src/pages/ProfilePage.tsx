import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  // const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>(() => JSON.parse(localStorage.getItem('userlist') || '[]'));
  const me = useMemo(() => users.find((u: any) => Number(u?.ID) === 1) || { Name: 'Benjamin', reviewsGiven: 0, washroomsVisited: 0, favoriteSpots: 0 }, [users]);

  useEffect(() => {
    const reload = () => setUsers(JSON.parse(localStorage.getItem('userlist') || '[]'));
    window.addEventListener('data-updated', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('data-updated', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">🧔‍♂️</div>
          </div>
          
          <div className="profile-info">
            <h2>{me.Name || 'User'}</h2>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Reviews Given</span>
                <span className="stat-value">{me.reviewsGiven ?? 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Washrooms Visited</span>
                <span className="stat-value">{me.washroomsVisited ?? 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Favorite Spots</span>
                <span className="stat-value">{me.favoriteSpots ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="action-button primary">
            Edit Profile
          </button>
          <button className="action-button secondary">
            Settings
          </button>
          <button className="action-button secondary">
            Help & Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
