import { faker } from '@faker-js/faker';

const faqData = [
  {
    id: faker.string.alphanumeric(10),
    question: 'What are Webinars?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'How do I join a webinar?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'What equipment do I need?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'Can I watch recorded sessions?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'Is there a cost to attend?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'What if I have technical issues?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'Can I ask questions during the webinar?',
    answer: faker.lorem.paragraph(),
  },
  {
    id: faker.string.alphanumeric(10),
    question: 'Will I receive presentation materials?',
    answer: faker.lorem.paragraph(),
  },
];

export { faqData as default };
