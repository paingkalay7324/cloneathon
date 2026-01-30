// Mock data for the Canvas clone

export const courses = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    instructor: 'Dr. Sarah Chen',
    color: '#FF6B35',
    term: 'Spring 2026',
    progress: 68,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    announcements: 2,
    assignments: 3
  },
  {
    id: 2,
    name: 'Calculus II',
    code: 'MATH 152',
    instructor: 'Prof. Michael Torres',
    color: '#2EC4B6',
    term: 'Spring 2026',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    announcements: 1,
    assignments: 2
  },
  {
    id: 3,
    name: 'Data Structures & Algorithms',
    code: 'CS 201',
    instructor: 'Dr. James Wright',
    color: '#9B5DE5',
    term: 'Spring 2026',
    progress: 82,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    announcements: 0,
    assignments: 1
  },
  {
    id: 4,
    name: 'Technical Writing',
    code: 'ENG 210',
    instructor: 'Prof. Emily Parker',
    color: '#F7C59F',
    term: 'Spring 2026',
    progress: 55,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    announcements: 1,
    assignments: 4
  }
]

export const assignments = [
  {
    id: 1,
    courseId: 1,
    title: 'Programming Assignment 3: Recursion',
    dueDate: '2026-02-05T23:59:00',
    points: 100,
    submitted: false,
    type: 'assignment',
    description: 'Implement recursive solutions for the given problems including factorial, fibonacci, and tree traversal.'
  },
  {
    id: 2,
    courseId: 1,
    title: 'Quiz 4: Control Structures',
    dueDate: '2026-02-03T14:00:00',
    points: 25,
    submitted: false,
    type: 'quiz',
    description: 'Multiple choice quiz covering if statements, loops, and switch cases.'
  },
  {
    id: 3,
    courseId: 2,
    title: 'Problem Set 5: Integration',
    dueDate: '2026-02-04T23:59:00',
    points: 50,
    submitted: false,
    type: 'assignment',
    description: 'Complete problems 1-15 on integration by parts and substitution.'
  },
  {
    id: 4,
    courseId: 3,
    title: 'Lab 6: Binary Search Trees',
    dueDate: '2026-02-06T23:59:00',
    points: 75,
    submitted: true,
    submittedDate: '2026-02-05T18:30:00',
    grade: 72,
    type: 'lab',
    description: 'Implement a binary search tree with insert, delete, and search operations.'
  },
  {
    id: 5,
    courseId: 4,
    title: 'Research Paper Draft',
    dueDate: '2026-02-08T23:59:00',
    points: 150,
    submitted: false,
    type: 'assignment',
    description: 'Submit your first draft of the technical research paper on your chosen topic.'
  },
  {
    id: 6,
    courseId: 4,
    title: 'Peer Review: Partner Paper',
    dueDate: '2026-02-10T23:59:00',
    points: 30,
    submitted: false,
    type: 'discussion',
    description: 'Provide constructive feedback on your assigned partner\'s paper draft.'
  }
]

export const modules = [
  {
    id: 1,
    courseId: 1,
    title: 'Week 1: Introduction to Programming',
    items: [
      { id: 1, type: 'page', title: 'Course Overview', completed: true },
      { id: 2, type: 'video', title: 'What is Programming?', duration: '15:30', completed: true },
      { id: 3, type: 'assignment', title: 'Hello World Exercise', completed: true },
      { id: 4, type: 'quiz', title: 'Intro Quiz', completed: true }
    ]
  },
  {
    id: 2,
    courseId: 1,
    title: 'Week 2: Variables and Data Types',
    items: [
      { id: 5, type: 'page', title: 'Understanding Variables', completed: true },
      { id: 6, type: 'video', title: 'Data Types Explained', duration: '22:15', completed: true },
      { id: 7, type: 'assignment', title: 'Variable Practice', completed: true },
      { id: 8, type: 'quiz', title: 'Data Types Quiz', completed: false }
    ]
  },
  {
    id: 3,
    courseId: 1,
    title: 'Week 3: Control Structures',
    items: [
      { id: 9, type: 'page', title: 'If Statements and Conditionals', completed: true },
      { id: 10, type: 'video', title: 'Loops Deep Dive', duration: '28:45', completed: false },
      { id: 11, type: 'assignment', title: 'Loop Exercises', completed: false },
      { id: 12, type: 'quiz', title: 'Control Structures Quiz', completed: false }
    ]
  },
  {
    id: 4,
    courseId: 1,
    title: 'Week 4: Functions and Recursion',
    items: [
      { id: 13, type: 'page', title: 'Introduction to Functions', completed: false },
      { id: 14, type: 'video', title: 'Recursion Explained', duration: '35:00', completed: false },
      { id: 15, type: 'assignment', title: 'Programming Assignment 3: Recursion', completed: false },
      { id: 16, type: 'quiz', title: 'Functions Quiz', completed: false }
    ]
  }
]

export const announcements = [
  {
    id: 1,
    courseId: 1,
    title: 'Office Hours Update',
    content: 'Office hours this week will be moved to Thursday 2-4pm due to the department meeting.',
    author: 'Dr. Sarah Chen',
    date: '2026-01-28T10:00:00',
    unread: true
  },
  {
    id: 2,
    courseId: 1,
    title: 'Assignment 3 Hints',
    content: 'I\'ve posted some helpful hints for the recursion assignment. Check the discussion board!',
    author: 'Dr. Sarah Chen',
    date: '2026-01-27T14:30:00',
    unread: true
  },
  {
    id: 3,
    courseId: 2,
    title: 'Midterm Study Guide Posted',
    content: 'The study guide for the upcoming midterm is now available in the Files section.',
    author: 'Prof. Michael Torres',
    date: '2026-01-26T09:00:00',
    unread: false
  }
]

export const grades = [
  { courseId: 1, assignmentId: 1, title: 'Programming Assignment 1', score: 95, total: 100, date: '2026-01-15' },
  { courseId: 1, assignmentId: 2, title: 'Programming Assignment 2', score: 88, total: 100, date: '2026-01-22' },
  { courseId: 1, assignmentId: 3, title: 'Quiz 1', score: 23, total: 25, date: '2026-01-10' },
  { courseId: 1, assignmentId: 4, title: 'Quiz 2', score: 24, total: 25, date: '2026-01-17' },
  { courseId: 1, assignmentId: 5, title: 'Quiz 3', score: 22, total: 25, date: '2026-01-24' },
  { courseId: 2, assignmentId: 6, title: 'Problem Set 1', score: 45, total: 50, date: '2026-01-12' },
  { courseId: 2, assignmentId: 7, title: 'Problem Set 2', score: 42, total: 50, date: '2026-01-19' },
  { courseId: 2, assignmentId: 8, title: 'Problem Set 3', score: 48, total: 50, date: '2026-01-26' },
  { courseId: 3, assignmentId: 9, title: 'Lab 1: Arrays', score: 70, total: 75, date: '2026-01-14' },
  { courseId: 3, assignmentId: 10, title: 'Lab 2: Linked Lists', score: 68, total: 75, date: '2026-01-21' },
  { courseId: 3, assignmentId: 11, title: 'Lab 3: Stacks', score: 75, total: 75, date: '2026-01-28' },
]

export const calendarEvents = [
  { id: 1, title: 'CS 101 Lecture', type: 'class', date: '2026-01-30', time: '10:00', duration: 75, color: '#FF6B35' },
  { id: 2, title: 'MATH 152 Lecture', type: 'class', date: '2026-01-30', time: '13:00', duration: 50, color: '#2EC4B6' },
  { id: 3, title: 'Quiz 4 Due', type: 'assignment', date: '2026-02-03', time: '14:00', color: '#FF6B35' },
  { id: 4, title: 'Problem Set 5 Due', type: 'assignment', date: '2026-02-04', time: '23:59', color: '#2EC4B6' },
  { id: 5, title: 'PA3 Due', type: 'assignment', date: '2026-02-05', time: '23:59', color: '#FF6B35' },
  { id: 6, title: 'Office Hours', type: 'office', date: '2026-01-30', time: '14:00', duration: 120, color: '#9B5DE5' },
]

export const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'Student',
  major: 'Computer Science',
  year: 'Sophomore'
}
