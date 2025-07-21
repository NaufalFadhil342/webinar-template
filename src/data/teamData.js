import { faker } from '@faker-js/faker';
import webinarHost from '../assets/team/woman1.jpg';
import contentStrategy from '../assets/team/woman2.jpg';
import marketManager from '../assets/team/man1.jpg';
import graphicDesign from '../assets/team/man2.jpg';
import technicDirect from '../assets/team/man3.jpg';
import customerSupport from '../assets/team/woman3.jpg';

const teamData = [
  {
    id: faker.string.alphanumeric(15),
    image: webinarHost,
    name: faker.person.fullName({ sex: 'female' }),
    description: faker.lorem.words(8),
    job: 'Webinar Host',
  },
  {
    id: faker.string.alphanumeric(15),
    image: contentStrategy,
    name: faker.person.fullName({ sex: 'female' }),
    description: faker.lorem.words(8),
    job: 'Content Strategist',
  },
  {
    id: faker.string.alphanumeric(15),
    image: marketManager,
    name: faker.person.fullName({ sex: 'male' }),
    description: faker.lorem.words(8),
    job: 'Marketing Manager',
  },
  {
    id: faker.string.alphanumeric(15),
    image: graphicDesign,
    name: faker.person.fullName({ sex: 'male' }),
    description: faker.lorem.words(8),
    job: 'Graphic Designer',
  },
  {
    id: faker.string.alphanumeric(15),
    image: technicDirect,
    name: faker.person.fullName({ sex: 'male' }),
    description: faker.lorem.words(8),
    job: 'Technical Director',
  },
  {
    id: faker.string.alphanumeric(15),
    image: customerSupport,
    name: faker.person.fullName({ sex: 'female' }),
    description: faker.lorem.words(8),
    job: 'Customer Support',
  },
];

export { teamData };
