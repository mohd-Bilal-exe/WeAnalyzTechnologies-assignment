import type { Ticket } from '../types/tickets';
import type { User } from '../types/Users';

export const dummyTickets: Ticket[] = [
  {
    id: 'TCK-001',
    priority: 'high',
    assignedTo: 'Bilal',
    createdAt: new Date('2026-02-01T09:00:00'),
    status: 'open',
    dueAt: new Date('2026-02-15T18:00:00'),
    activeUsers: ['u1', 'u2', 'u3'],
    todoAttached: ['Fix auth bug', 'Write unit tests'],
    data: {
      title: 'Authentication Fails on Refresh',
      content: 'JWT token gets cleared on page reload.',
      description: 'Users are logged out unexpectedly after refreshing the dashboard page.',
      labels: ['bug', 'auth', 'urgent'],
      docs: [
        { title: 'auth-flow.md', uploadedDate: new Date('2026-02-01') },
        { title: 'jwt-spec.pdf', uploadedDate: new Date('2026-02-01') },
      ],
      messages: [
        {
          userSender: 'u1',
          text: 'I am looking into this issue.',
          time: new Date('2026-02-01T10:00:00'),
          docs: [],
        },
        {
          userSender: 'u3',
          userReply: 'u1',
          text: 'Root cause found. localStorage gets wiped during hydration.',
          time: new Date('2026-02-02T09:30:00'),
          docs: [],
        },
        {
          userSender: 'u2',
          userReply: 'u3',
          text: 'Should we move token handling to httpOnly cookies?',
          time: new Date('2026-02-02T11:00:00'),
          docs: [
            {
              title: 'security-notes.md',
              uploadedDate: new Date('2026-02-02'),
            },
          ],
        },
      ],
    },
  },
  {
    id: 'TCK-002',
    priority: 'mid',
    assignedTo: 'Aisha',
    createdAt: new Date('2026-02-03T11:30:00'),
    status: 'open',
    dueAt: new Date('2026-02-20T17:00:00'),
    activeUsers: ['u1', 'u2'],
    todoAttached: ['Design wireframe', 'Get stakeholder approval'],
    data: {
      title: 'Redesign Ticket Dashboard',
      content: 'Improve UX and layout clarity.',
      description:
        'Current dashboard feels cluttered. Improve hierarchy and add filtering options.',
      labels: ['ui', 'enhancement'],
      docs: [
        {
          title: 'dashboard-sketch.fig',
          uploadedDate: new Date('2026-02-03'),
        },
      ],
      messages: [
        {
          userSender: 'u5',
          text: 'Working on new layout concepts.',
          time: new Date('2026-02-04T09:00:00'),
          docs: [
            {
              title: 'initial-wireframe.fig',
              uploadedDate: new Date('2026-02-04'),
            },
          ],
        },
        {
          userSender: 'u2',
          userReply: 'u5',
          text: 'Let’s prioritize filtering before visual polish.',
          time: new Date('2026-02-04T13:45:00'),
          docs: [],
        },
      ],
    },
  },
  {
    id: 'TCK-003',
    priority: 'low',
    assignedTo: 'Omar',
    createdAt: new Date('2026-01-28T14:15:00'),
    status: 'closed',
    dueAt: new Date('2026-02-05T12:00:00'),
    activeUsers: ['u1'],
    todoAttached: ['Optimize query', 'Benchmark response time'],
    data: {
      title: 'Database Query Optimization',
      content: 'Slow response when loading ticket list.',
      description: 'Optimize SQL joins and add indexing on priority and status columns.',
      labels: ['backend', 'performance'],
      docs: [
        {
          title: 'query-plan.txt',
          uploadedDate: new Date('2026-01-29'),
        },
      ],
      messages: [
        {
          userSender: 'u3',
          text: 'Query execution time is around 1.8s.',
          time: new Date('2026-01-29T10:00:00'),
          docs: [
            {
              title: 'before-optimization.txt',
              uploadedDate: new Date('2026-01-29'),
            },
          ],
        },
        {
          userSender: 'u3',
          text: 'Added composite index.',
          time: new Date('2026-01-30T16:10:00'),
          docs: [
            {
              title: 'after-optimization.txt',
              uploadedDate: new Date('2026-01-30'),
            },
          ],
        },
      ],
    },
  },
  {
    id: 'TCK-004',
    priority: 'high',
    assignedTo: 'Sara',
    createdAt: new Date('2026-02-05T08:45:00'),
    status: 'open',
    dueAt: new Date('2026-02-10T16:00:00'),
    activeUsers: ['u1', 'u5', 'u100', 'u54', 'u1030', 'u51', 'u10'],
    todoAttached: ['Validate inputs', 'Handle edge cases'],
    data: {
      title: 'Form Validation Error',
      content: 'Submission fails without visible error.',
      description: 'Users are submitting empty forms. Validation needs to block and show feedback.',
      labels: ['frontend', 'validation', 'bug'],
      docs: [
        {
          title: 'form-schema.json',
          uploadedDate: new Date('2026-02-05'),
        },
      ],
      messages: [
        {
          userSender: 'u10',
          text: 'Reproduced.',
          time: new Date('2026-02-05T09:30:00'),
          docs: [],
        },
        {
          userSender: 'u100',
          userReply: 'u10',
          text: 'Server-side validation required.',
          time: new Date('2026-02-05T13:15:00'),
          docs: [
            {
              title: 'api-validation-plan.md',
              uploadedDate: new Date('2026-02-05'),
            },
          ],
        },
        {
          userSender: 'u1',
          userReply: 'u100',
          text: 'High priority. Let’s ship fix before tomorrow evening.',
          time: new Date('2026-02-05T15:00:00'),
          docs: [],
        },
      ],
    },
  },
  {
    id: 'TCK-005',
    priority: 'mid',
    assignedTo: 'Karan',
    createdAt: new Date('2026-02-06T09:15:00'),
    status: 'open',
    dueAt: new Date('2026-02-18T17:00:00'),
    activeUsers: ['u200', 'u1', 'u203'],
    todoAttached: ['Implement pagination', 'Add loading skeleton'],
    data: {
      title: 'Pagination Not Working on Ticket List',
      content: 'Next page button does nothing.',
      description: 'When clicking next page, the UI does not update. API call seems correct.',
      labels: ['frontend', 'bug'],
      docs: [
        {
          title: 'pagination-debug.log',
          uploadedDate: new Date('2026-02-06'),
        },
      ],
      messages: [
        {
          userSender: 'u200',
          text: 'Investigating why state is not updating.',
          time: new Date('2026-02-06T10:00:00'),
          docs: [],
        },
        {
          userSender: 'u203',
          userReply: 'u200',
          text: 'Tested on staging. Issue reproducible.',
          time: new Date('2026-02-06T11:20:00'),
          docs: [],
        },
        {
          userSender: 'u1',
          userReply: 'u200',
          text: 'Check if useEffect dependency array is missing page param.',
          time: new Date('2026-02-06T12:10:00'),
          docs: [],
        },
      ],
    },
  },
  {
    id: 'TCK-006',
    priority: 'high',
    assignedTo: 'Divya',
    createdAt: new Date('2026-02-07T08:00:00'),
    status: 'open',
    dueAt: new Date('2026-02-12T18:00:00'),
    activeUsers: ['u205', 'u202', 'u203'],
    todoAttached: ['Audit logs', 'Check access control'],
    data: {
      title: 'Unauthorized Access to Admin Panel',
      content: 'Non-admin user accessed admin route.',
      description: 'Role-based route protection failed under certain conditions.',
      labels: ['security', 'critical'],
      docs: [
        {
          title: 'access-log.txt',
          uploadedDate: new Date('2026-02-07'),
        },
      ],
      messages: [
        {
          userSender: 'u203',
          text: 'QA detected access using direct URL.',
          time: new Date('2026-02-07T09:10:00'),
          docs: [],
        },
        {
          userSender: 'u202',
          userReply: 'u203',
          text: 'Looks like frontend guard only. Backend not validating role.',
          time: new Date('2026-02-07T10:30:00'),
          docs: [],
        },
        {
          userSender: 'u205',
          userReply: 'u202',
          text: 'Fix immediately. This is security priority.',
          time: new Date('2026-02-07T11:15:00'),
          docs: [],
        },
      ],
    },
  },
  {
    id: 'TCK-007',
    priority: 'low',
    assignedTo: 'Sneha',
    createdAt: new Date('2026-02-08T14:30:00'),
    status: 'open',
    dueAt: new Date('2026-02-25T16:00:00'),
    activeUsers: ['u201', 'u5', 'u1'],
    todoAttached: ['Create illustration set', 'Update brand colors'],
    data: {
      title: 'Update Branding Assets',
      content: 'Old logo still appears in footer.',
      description: 'Brand guidelines updated but footer and email templates still use old assets.',
      labels: ['design', 'enhancement'],
      docs: [
        {
          title: 'brand-guidelines-2026.pdf',
          uploadedDate: new Date('2026-02-08'),
        },
      ],
      messages: [
        {
          userSender: 'u201',
          text: 'Uploading new logo assets today.',
          time: new Date('2026-02-08T15:00:00'),
          docs: [],
        },
        {
          userSender: 'u5',
          userReply: 'u201',
          text: 'Please also update favicon and email templates.',
          time: new Date('2026-02-08T16:20:00'),
          docs: [],
        },
        {
          userSender: 'u1',
          text: 'Let’s schedule release for next sprint.',
          time: new Date('2026-02-08T17:10:00'),
          docs: [],
        },
      ],
    },
  },
];

export const dummyUsers: User[] = [
  {
    id: 'u1',
    name: 'Mohd Bilal',
    email: 'bilal@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'u3',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'u5',
    name: 'Priya Verma',
    email: 'priya.verma@example.com',
    role: 'designer',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'u10',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    role: 'qa',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'u51',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    role: 'designer',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 'u54',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 'u100',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@example.com',
    role: 'qa',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'u1030',
    name: 'Imran Khan',
    email: 'imran.khan@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'u200',
    name: 'Karan Mehta',
    email: 'karan.mehta@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 'u201',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    role: 'designer',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'u202',
    name: 'Aditya Nair',
    email: 'aditya.nair@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'u203',
    name: 'Meera Joshi',
    email: 'meera.joshi@example.com',
    role: 'qa',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 'u204',
    name: 'Rahul Chatterjee',
    email: 'rahul.chatterjee@example.com',
    role: 'developer',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 'u205',
    name: 'Divya Pillai',
    email: 'divya.pillai@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
];
