// This component allows users to view and update their profile information.

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, error } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profile: {
      name: '',
      age: '',
      height: '',
      weight: '',
      fitnessLevel: 'beginner'
    },
    password: '',
    password2: ''
  });

  useEffect(() => { // useEffect hook is used to update the form data when the user object changes.
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        profile: {
          name: user.profile?.name || '',
          age: user.profile?.age || '',
          height: user.profile?.height || '',
          weight: user.profile?.weight || '',
          fitnessLevel: user.profile?.fitnessLevel || 'beginner'
        },
        password: '',
        password2: ''
      });
    }
  }, [user]);

  const onChange = e => {
    if (e.target.name.startsWith('profile.')) { // e.target.name.startsWith('profile.') checks if the input field is part of the profile object.
      const profileField = e.target.name.split('.')[1];
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSuccessMessage('');

    // Handle password update
    const updateData = { // Called updateData, which is an object that contains the user's username, email, and profile information.
      username: formData.username,
      email: formData.email,
      profile: formData.profile
    };

    // Only add password if provided
    if (formData.password) { // formData is from the state variable, so we can access the password field directly.
      if (formData.password !== formData.password2) { // If the passwords do not match, an alert is shown to the user.
        alert('Passwords do not match');
        return;
      }
      updateData.password = formData.password;
    }

    const success = await updateProfile(updateData); 
    
    if (success) {
      setSuccessMessage('Profile updated successfully!');
      
      // Clear passwords
      setFormData({
        ...formData,
        password: '',
        password2: ''
      });
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">My Profile</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
                
              <form onSubmit={onSubmit}>
                <div className="row">
                  {/* Account Information */}
                  <div className="col-md-6">
                    <h5>Account Information</h5>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">New Password (leave blank to keep current)</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        minLength="6"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password2" className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={onChange}
                        minLength="6"
                      />
                    </div>
                  </div>
                  
                  {/* Personal Information */}
                  <div className="col-md-6">
                    <h5>Personal Information</h5>
                    <div className="mb-3">
                      <label htmlFor="profile.name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="profile.name"
                        name="profile.name"
                        value={formData.profile.name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profile.age" className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        id="profile.age"
                        name="profile.age"
                        value={formData.profile.age}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profile.height" className="form-label">Height (cm)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="profile.height"
                        name="profile.height"
                        value={formData.profile.height}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profile.weight" className="form-label">Weight (kg)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="profile.weight"
                        name="profile.weight"
                        value={formData.profile.weight}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profile.fitnessLevel" className="form-label">Fitness Level</label>
                      <select
                        className="form-select"
                        id="profile.fitnessLevel"
                        name="profile.fitnessLevel"
                        value={formData.profile.fitnessLevel}
                        onChange={onChange}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;