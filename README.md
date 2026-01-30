# LearnFlow 📚

A beautiful Canvas LMS clone with an integrated AI Study Buddy powered by DeepSeek. Built with React, Vite, and Framer Motion.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)
![DeepSeek](https://img.shields.io/badge/DeepSeek-Chat-4A90A4)

## ✨ Features

### 📖 Learning Management
- **Dashboard** - Overview of courses, assignments, and announcements
- **Courses** - Detailed course pages with modules and progress tracking
- **Assignments** - View, filter, and track assignment due dates
- **Grades** - Comprehensive grade tracking with visual analytics
- **Calendar** - Week and month views with events and due dates

### 🤖 AI Study Buddy
- **DeepSeek Integration** - Powered by DeepSeek Chat for intelligent tutoring
- **Course Context** - AI understands which course you're studying
- **Quick Prompts** - One-click actions for common study tasks
- **Code Help** - Syntax-highlighted code blocks for programming help
- **Study Tips** - Personalized study strategies and guidance

### 🎨 Beautiful Design
- **Warm Academia Theme** - Elegant cream and coral color palette
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Typography** - Fraunces display font + DM Sans for readability

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A DeepSeek API key ([Get one here](https://platform.deepseek.com/api_keys))

### Installation

1. **Navigate to the project:**
   ```bash
   cd cloneathon/cloneathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

5. **Configure AI Study Buddy:**
   - Click the "AI Tutor" button in the header
   - Click the ⚙️ Settings icon
   - Enter your DeepSeek API key
   - Start learning with AI assistance!

## 📱 Pages & Features

### Dashboard
The main hub showing:
- Welcome message with personalized stats
- Course cards with progress indicators
- Upcoming assignments with due dates
- Recent announcements

### Course View
Detailed course page featuring:
- Course banner with progress
- Module navigation with expand/collapse
- Progress tracking per module
- Course-specific announcements

### Assignments
Assignment management with:
- Filter by status (Upcoming, Past Due, Submitted)
- Search functionality
- Grouped by date (Today, This Week, Later)
- Visual indicators for urgent items

### Grades
Grade analytics including:
- Overall GPA calculation
- Per-course grade breakdown
- Grade trends
- Detailed assignment scores

### Calendar
Event scheduling with:
- Week and Month views
- Class schedules
- Assignment due dates
- Office hours

## 🤖 Using the AI Study Buddy

The AI Study Buddy can help with:

1. **Explaining Concepts**
   - "Can you explain recursion in simple terms?"
   - "What's the difference between let and const?"

2. **Homework Help**
   - "I'm stuck on this calculus problem..."
   - "How do I approach this coding assignment?"

3. **Code Review**
   - "Can you review my code and suggest improvements?"
   - "What's wrong with this function?"

4. **Study Strategies**
   - "How should I prepare for my CS midterm?"
   - "What's the best way to learn data structures?"

### Course Context
Select a course from the dropdown to give the AI context about what you're studying. This helps it provide more relevant and targeted assistance.

## 🏗️ Project Structure

```
cloneathon/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AITutor.jsx       # AI chat panel
│   │   ├── Header.jsx        # Top navigation
│   │   ├── SettingsModal.jsx # API key settings
│   │   └── Sidebar.jsx       # Navigation sidebar
│   ├── data/
│   │   └── mockData.js       # Sample course/assignment data
│   ├── pages/
│   │   ├── Assignments.jsx   # Assignment list page
│   │   ├── Calendar.jsx      # Calendar view
│   │   ├── Course.jsx        # Individual course page
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   └── Grades.jsx        # Grades overview
│   ├── services/
│   │   └── openai.js         # DeepSeek API integration
│   ├── styles/
│   │   └── index.css         # Global styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color Palette
- **Cream Background**: `#FAF7F2`
- **Coral Accent**: `#FF6B35`
- **Teal**: `#2EC4B6`
- **Purple**: `#9B5DE5`
- **Gold**: `#F7C59F`

### Typography
- **Display**: Fraunces (headings)
- **Body**: DM Sans (text)

### Theme: Warm Academia
Inspired by cozy libraries and scholarly aesthetics, featuring warm neutrals, elegant serif headings, and subtle gradients.

## 🔧 Configuration

### Changing AI Model

Edit `src/services/openai.js`:

```javascript
const response = await openai.chat.completions.create({
  model: 'deepseek-chat',  // Options: 'deepseek-chat', 'deepseek-coder'
  // ...
})
```

Available DeepSeek models:
- `deepseek-chat` - General purpose chat model (default)
- `deepseek-coder` - Specialized for coding tasks

### Adding Mock Data

Edit `src/data/mockData.js` to add:
- New courses
- Assignments
- Modules and content
- Announcements
- Calendar events

## 🛡️ Security Notes

- API keys are stored in browser localStorage
- Direct API calls to DeepSeek (client-side)
- For production, use a backend proxy to protect your API key

## 💰 DeepSeek Pricing

DeepSeek offers very affordable API pricing:
- ~$0.14 per 1 million input tokens
- ~$0.28 per 1 million output tokens

A few dollars will last thousands of conversations!

## 📄 License

MIT License - Use freely for learning and building!

## 🙏 Credits

- Design inspired by Canvas LMS and modern edu-tech platforms
- Icons by React Icons (Feather Icons)
- Animations by Framer Motion
- Date handling by date-fns
- AI powered by DeepSeek

---

Built with ❤️ for students everywhere
