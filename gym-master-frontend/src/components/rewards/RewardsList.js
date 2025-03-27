// This component displays a list of rewards that the user has earned and can earn.
// The component fetches the user's earned rewards and all available rewards from the API.
// It also provides a button to check for new rewards and displays any newly earned rewards.

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const RewardsList = () => {
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkingRewards, setCheckingRewards] = useState(false);
  const [newRewards, setNewRewards] = useState([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      
      // Get all available rewards
      const allRewardsRes = await api.get('/rewards');
      console.log('All rewards response:', allRewardsRes.data);
      
      // Handle different response formats
      let rewardsData = [];
      if (Array.isArray(allRewardsRes.data)) {
        rewardsData = allRewardsRes.data;
      } else if (allRewardsRes.data.data && Array.isArray(allRewardsRes.data.data)) {
        rewardsData = allRewardsRes.data.data;
      } else {
        console.warn('Rewards data not in expected format:', allRewardsRes.data);
        rewardsData = [];
      }
      setRewards(rewardsData);
      
      // Get user's earned rewards
      const userRewardsRes = await api.get('/rewards/user');
      console.log('User rewards response:', userRewardsRes.data);
      
      // Handle different response formats
      let userRewardsData = [];
      if (Array.isArray(userRewardsRes.data)) {
        userRewardsData = userRewardsRes.data;
      } else if (userRewardsRes.data.data && Array.isArray(userRewardsRes.data.data)) {
        userRewardsData = userRewardsRes.data.data;
      } else {
        console.warn('User rewards data not in expected format:', userRewardsRes.data);
        userRewardsData = [];
      }
      setUserRewards(userRewardsData);
      
      setError('');
    } catch (err) {
      console.error('Error fetching rewards:', err);
      setError(err.response?.data?.message || 'Failed to fetch rewards');
      // Initialize with empty arrays on error
      setRewards([]);
      setUserRewards([]);
    } finally {
      setLoading(false);
    }
  };

  const checkForNewRewards = async () => { // Function to check for new rewardsz
    try {
      setCheckingRewards(true);
      setNewRewards([]);
      
      const res = await api.post('/rewards/check');
      console.log('Check rewards response:', res.data);
      
      // Handle different response formats
      let newEarnedRewards = [];
      if (Array.isArray(res.data)) {
        newEarnedRewards = res.data;
      } else if (res.data.data && Array.isArray(res.data.data)) {
        newEarnedRewards = res.data.data;
      } else {
        console.warn('New rewards data not in expected format:', res.data);
        newEarnedRewards = [];
      }
      
      setNewRewards(newEarnedRewards);
      
      if (newEarnedRewards.length > 0) {
        // Refresh the user's rewards
        await fetchRewards();
      }
    } catch (err) {
      console.error('Error checking for rewards:', err);
      setError(err.response?.data?.message || 'Failed to check for new rewards');
    } finally {
      setCheckingRewards(false);
    }
  };

  // Helper to check if user has earned a reward
  const hasEarnedReward = (rewardId) => {
    if (!Array.isArray(userRewards)) return false;
    
    return userRewards.some(ur => 
      (ur.reward && ur.reward._id === rewardId) || 
      (ur.reward && ur.reward.id === rewardId) ||
      (ur._id === rewardId) || 
      (ur.id === rewardId)
    );
  };

  // Render reward badge ( earned or not )
  const renderRewardBadge = (reward, earned) => {
    if (!reward) return null;
    
    return (
      <div 
        className={`card h-100 ${earned ? 'border-success' : 'border-secondary text-muted'}`} 
        key={reward._id || reward.id || `reward-${Math.random()}`}
      >
        <div className="card-body text-center">
          <div className="display-1 mb-3">
            {getRewardIcon(reward.type)}
          </div>
          <h5 className="card-title">
            {reward.name || 'Unnamed Reward'}
            {earned && <span className="badge bg-success ms-2">Earned</span>}
          </h5>
          <p className="card-text">{reward.description || 'No description available'}</p>
          {reward.pointsValue > 0 && (
            <div className="mt-2">
              <span className="badge bg-primary">{reward.pointsValue} points</span>
            </div>
          )}
        </div>
        <div className="card-footer bg-transparent">
          <small className="text-muted">
            {getRequirementText(reward.requirements)}
          </small>
        </div>
      </div>
    );
  };

  // Get icon based on reward type ( COULD MAKE OUR OWN ICONS IN FUTURE ? )
  const getRewardIcon = (type) => {
    switch (type) {
      case 'badge':
        return '🏅';
      case 'achievement':
        return '🏆';
      case 'milestone':
        return '🎯';
      case 'level':
        return '⭐';
      default:
        return '🎁';
    }
  };

  // Get readable text for requirements
  const getRequirementText = (requirements) => {
    if (!requirements) return 'Special achievement';
    
    let text = '';
    
    if (requirements.exerciseType) {
      const exerciseType = requirements.exerciseType.charAt(0).toUpperCase() + requirements.exerciseType.slice(1);
      text += exerciseType + ' - ';
    }
    
    if (requirements.totalCount) {
      text += `Complete ${requirements.totalCount} total`;
    } else if (requirements.streak) {
      text += `${requirements.streak} day streak`;
    } else if (requirements.count) {
      text += `${requirements.count} in one session`;
    }
    
    return text || 'Special achievement';
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>My Rewards</h2>
          <p className="text-muted">Track your achievements and unlock new rewards as you progress!</p>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-primary" 
            onClick={checkForNewRewards}
            disabled={checkingRewards}
          >
            {checkingRewards ? 'Checking...' : 'Check for New Rewards'}
          </button>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Newly earned rewards */}
      {Array.isArray(newRewards) && newRewards.length > 0 && (
        <div className="alert alert-success">
          <h4>Congratulations! You've earned new rewards!</h4>
          <ul className="mb-0">
            {newRewards.map(nr => (
              <li key={nr._id || nr.id || `new-reward-${Math.random()}`}>
                {getRewardIcon(nr.reward?.type || 'badge')} {nr.reward?.name || 'New Reward'}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Earned rewards */}
      <div className="row mb-4">
        <div className="col-12">
          <h4>Earned Rewards ({Array.isArray(userRewards) ? userRewards.length : 0})</h4>
          {!Array.isArray(userRewards) || userRewards.length === 0 ? (
            <div className="alert alert-info">
              You haven't earned any rewards yet. Keep working out to unlock achievements!
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {userRewards.map(ur => {
                // Handle different data structures
                const reward = ur.reward || ur;
                return (
                  <div className="col" key={ur._id || ur.id || `user-reward-${Math.random()}`}>
                    {renderRewardBadge(reward, true)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Available rewards */}
      <div className="row">
        <div className="col-12">
          <h4>Available Rewards</h4>
          {!Array.isArray(rewards) || rewards.length === 0 ? (
            <div className="alert alert-info">
              No rewards available yet. Check back soon!
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {rewards.map(reward => {
                const earned = hasEarnedReward(reward._id || reward.id);
                if (!earned) {
                  return (
                    <div className="col" key={reward._id || reward.id || `reward-${Math.random()}`}>
                      {renderRewardBadge(reward, false)}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsList;