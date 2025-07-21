import { faker } from '@faker-js/faker';

const dummyNotifData = [
  {
    id: faker.string.alphanumeric(15),
    webinar: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    date: '2025-01-07',
  },
  {
    id: faker.string.alphanumeric(15),
    webinar: 'Adipisicing elit obcaecati quas iusto officia laboriosam.',
    date: '2025-01-14',
  },
  {
    id: faker.string.alphanumeric(15),
    webinar: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    date: '2025-01-24',
  },
  {
    id: faker.string.alphanumeric(15),
    webinar: 'Adipisicing elit obcaecati quas iusto officia laboriosam.',
    date: '2025-02-04',
  },
];

export { dummyNotifData };
