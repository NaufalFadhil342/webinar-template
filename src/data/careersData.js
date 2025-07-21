import { faker } from '@faker-js/faker';

const careersData = [
  {
    id: faker.string.alphanumeric(15),
    job: 'Marketing',
    position: 'Webinar Producer',
    description: faker.lorem.paragraphs(1),
    location: 'Remote',
    assignment: 'Contract',
  },
  {
    id: faker.string.alphanumeric(15),
    job: 'Information Technology',
    position: 'Technical Support',
    description: faker.lorem.paragraphs(1),
    location: 'Remote',
    assignment: 'Full Time',
  },
  {
    id: faker.string.alphanumeric(15),
    job: 'Sales',
    position: 'Sales Executive',
    description: faker.lorem.paragraphs(1),
    location: 'Hybrid',
    assignment: 'Contract',
  },
  {
    id: faker.string.alphanumeric(15),
    job: 'Human Resources',
    position: 'Event Manager',
    description: faker.lorem.paragraphs(1),
    location: 'Hybrid',
    assignment: 'Full Time',
  },
];

export { careersData };
