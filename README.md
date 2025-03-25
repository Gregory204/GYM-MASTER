# GYM-MASTER 🏋️‍♂️

A cutting-edge fitness application that combines AI coaching, real-time form correction, and social competition to transform your workout experience.

## Architecture Overview 📊

![Gym Master Architecture](<img width="1440" alt="GYM_MASTER_FLOWCHART" src="https://github.com/user-attachments/assets/c116da03-bbfe-43ad-b5b1-7d4855b57406" />)

Our application follows a modern, microservices architecture:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   Mobile App    │◄────►│    AI Coach     │◄────►│ Backend Services│
│React Native+Expo│      │TensorFlow+TTS  │       │ Node.js+MongoDB │
│                 │      │                 │      │                 │
└────────┬────────┘      └─────────────────┘      └────────┬────────┘
         │                                                  │
         │                                                  │
         ▼                                                  ▼
┌─────────────────┐                               ┌─────────────────-┐
│                 │                               │                  │
│  Competition    │◄──────────────────────────►   │    Analytics     |
│     System      │                               │    Platform      │
│ WebRTC+Socket.io│                               │Firebase Analytics│
│                 │                               │                  │
└─────────────────┘                               └─────────────────-┘
```

## Features ✨

- 📱 **Mobile Application**: User-friendly interface with exercise tracking and gamification
- 🤖 **AI Coach**: Real-time pose estimation and form correction
- 🗣️ **Voice Coaching**: Audio feedback during workouts
- 🏆 **Competition System**: Challenge friends with dual-phone battles
- 📊 **Progress Tracking**: Comprehensive metrics and achievements
- 🔐 **User Authentication**: Secure account management
- 🏅 **Rewards System**: Gamified workout experience with achievements

## Technology Stack 💻

### Frontend
- React Native with Expo
- Camera integration for pose detection
- UI/UX with gamification elements

### AI Components
- TensorFlow for pose estimation
- Google TTS for voice coaching
- Form correction algorithms

### Backend
- Node.js server with Express
- MongoDB database
- JWT authentication
- RESTful API architecture

### Real-time Features
- WebRTC for video streaming
- Socket.io for real-time communication
- Social guild system

### Analytics
- User engagement tracking
- Performance metrics
- Feature usage analysis

## Getting Started 🚀

### Prerequisites

- Node.js v14+ and npm
- MongoDB
- React Native development environment

### Installation

1. Clone the repository
```bash
git clone https://github.com/Gregory204/GYM-MASTER.git
cd GYM-MASTER
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the backend server 
```bash
npm start
```

5. Install and run the mobile app 
```bash
cd ../mobile
npm install
npm start
```

## API Documentation 📝 ( WORKING... )

Our backend provides the following RESTful endpoints:

### Authentication ( WORKING... )
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate a user

### User Profiles ( WORKING... )
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Progress Tracking ( WORKING... )
- `POST /api/progress` - Record a new workout
- `GET /api/progress` - Get workout history
- `GET /api/progress/:id` - Get specific workout details

### Rewards System ( WORKING... )
- `GET /api/rewards` - List all available rewards
- `GET /api/rewards/user` - Get user's earned rewards
- `POST /api/rewards/check` - Check for new earned rewards

## Testing 🧪

We use Mocha and Chai for testing our backend services:

```bash
# Run user tests
npm testUser

```

## Contributing 👥

We welcome contributions to GYM-MASTER! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

---

LETS GO JIM!
