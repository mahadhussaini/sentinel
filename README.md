# Sentinel - AI Cybersecurity Guardian

A comprehensive AI-powered cybersecurity monitoring and threat detection system built with Next.js, Vite, and Tailwind CSS.

## 🚀 Features

### Dashboard Overview
- **Real-time Security Status**: Live monitoring with status indicators (Safe, Warning, Critical)
- **Threat Alerts**: Interactive alert system with severity levels and threat categorization
- **Activity Logs**: Comprehensive logging of security events and user activities
- **Global Threat Map**: Visual representation of worldwide threat sources

### AI-Powered Threat Detection
- Advanced threat analysis engine with confidence scoring
- Anomaly detection for phishing, malware, and brute-force attacks
- Real-time monitoring of network traffic and user behavior

### Interactive AI Assistant
- Chat interface for security queries and recommendations
- Contextual security advice and explanations
- Proactive threat analysis and response suggestions

### Security Toolkit
- Password strength analyzer
- Two-factor authentication simulator
- Data breach checking against mock databases

### Advanced Features
- **Dark Cybersecurity Theme**: Professional hacker-style interface
- **Real-time Notifications**: Toast notifications for security events
- **Responsive Design**: Optimized for desktop and mobile devices
- **Simulated Attack Scenarios**: Educational security training modules

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom cybersecurity theme
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Charts**: Recharts
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sentinel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Theme Customization

The application uses a custom cybersecurity theme with dark colors and neon accents:

- **Primary Colors**: Cyber black (#0a0a0a), dark gray variants
- **Accent Colors**: Cyber green (#00ff88), red (#ff4444), blue (#00aaff)
- **Typography**: Monospace fonts for authentic terminal feel
- **Animations**: Pulse, glow, and scanning effects

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_AI_ENDPOINT=your_ai_endpoint_here
```

### Customizing Threat Detection
Modify the threat detection algorithms in `/lib/threatDetection.ts` to integrate with real security APIs or adjust sensitivity levels.

## 📱 Usage

### Dashboard
- Monitor overall security status
- View real-time threat alerts
- Track security events and logs
- Analyze global threat patterns

### AI Assistant
- Ask security-related questions
- Get personalized security recommendations
- Receive threat analysis and explanations

### Security Tools
- Test password strength
- Practice 2FA setup
- Check for data breaches

### Training Module
- Experience simulated attacks
- Learn threat recognition
- Practice incident response

## 🧪 Mock Data

The application currently uses mock data for demonstration purposes. Replace with real security APIs for production use:

- `/lib/mockData.ts` - Threat data and alerts
- `/lib/threatEngine.ts` - AI analysis simulation
- `/api/` - Mock API endpoints

## 🚧 Development

### Project Structure
```
sentinel/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── security/        # Security tool components
│   └── ui/             # Generic UI components
├── lib/                # Utility functions and data
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

### Adding New Features
1. Create component in appropriate directory
2. Add route in `/app` directory
3. Update navigation in `/components/Navigation.tsx`
4. Add to feature documentation

## 🔒 Security Considerations

- All threat data is currently simulated for demonstration
- Implement proper authentication before production deployment
- Validate and sanitize all user inputs
- Use HTTPS in production environments
- Regular security audits recommended

## 🎯 Roadmap

- [ ] Real AI integration with LLM APIs
- [ ] Multi-user authentication system
- [ ] Real-time threat feed integration
- [ ] Mobile application
- [ ] Advanced reporting and analytics
- [ ] Integration with popular security tools

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@Sentinel-security.com or create an issue in this repository.

