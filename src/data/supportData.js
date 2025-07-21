import { mdiGoogle, mdiYahoo, mdiMicrosoftBing, mdiGoogleChrome, mdiFirefox, mdiMicrosoftEdge } from '@mdi/js';
import { faker } from '@faker-js/faker';

// Support icons moved to separate constant
const SUPPORT_ICONS = {
  google: mdiGoogle,
  yahoo: mdiYahoo,
  bing: mdiMicrosoftBing,
  chrome: mdiGoogleChrome,
  firefox: mdiFirefox,
  edge: mdiMicrosoftEdge,
};

const supportData = [
  { id: 'google', icon: SUPPORT_ICONS.google },
  { id: 'yahoo', icon: SUPPORT_ICONS.yahoo },
  { id: 'bing', icon: SUPPORT_ICONS.bing },
  { id: 'chrome', icon: SUPPORT_ICONS.chrome },
  { id: 'firefox', icon: SUPPORT_ICONS.firefox },
  { id: 'edge', icon: SUPPORT_ICONS.edge },
];

// Enhanced FAQ categories
const supportFAQ = [
  {
    category: 'Registration',
    questions: [
      {
        id: 'register-webinar',
        question: 'How do I register for a webinar?',
        answer: faker.lorem.paragraph(2),
      },
      {
        id: 'confirmation-email',
        question: "I didn't receive a confirmation email. What should I do?",
        answer: faker.lorem.paragraph(2),
      },
    ],
  },
  {
    category: 'Technical Issues',
    questions: [
      {
        id: 'join-webinar',
        question: 'How do I join the webinar?',
        answer: faker.lorem.paragraph(2),
      },
      {
        id: 'join-error',
        question: "I'm getting an error when joining the webinar. What should I do?",
        answer: faker.lorem.paragraph(2),
      },
    ],
  },
  {
    category: 'Recordings',
    questions: [
      {
        id: 'webinar-recording',
        question: 'Will the webinar be recorded?',
        answer: faker.lorem.paragraph(2),
      },
      {
        id: 'past-recordings',
        question: 'Where can I access past webinar recordings?',
        answer: faker.lorem.paragraph(2),
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        id: 'mobile-access',
        question: 'Can I join from my phone?',
        answer: faker.lorem.paragraph(2),
      },
    ],
  },
];

export { supportData, supportFAQ };
