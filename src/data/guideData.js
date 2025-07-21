import register from '../assets/vector/register.png';
import emailChecked from '../assets/vector/verification.png';
import funds from '../assets/vector/funds.png';
import { faker } from '@faker-js/faker';

const dummyGuideData = [
  {
    id: faker.string.alphanumeric(15),
    title: 'Step 1: Select a webinar',
    shortText: faker.lorem.words(5),
    image: register,
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Step 2: Make a deal',
    shortText: faker.lorem.words(6),
    image: funds,
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Step 3: Join the webinar',
    shortText: faker.lorem.words(7),
    image: emailChecked,
  },
];

export { dummyGuideData };
