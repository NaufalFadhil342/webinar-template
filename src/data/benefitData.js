import speaker from '../assets/images/speakers.jpg';
import recording from '../assets/images/recording.jpg';
import networking from '../assets/images/networking.jpg';
import { faker } from '@faker-js/faker';

const dummyBenefitData = [
  {
    id: faker.string.alphanumeric(15),
    title: 'Learn from Expert Speakers in Every Session',
    description: faker.lorem.words(10),
    image: speaker,
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Access Recordings Anytime, Anywhere',
    description: faker.lorem.words(10),
    image: recording,
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Network with Peers and Industry Leaders',
    description: faker.lorem.words(10),
    image: networking,
  },
];

export { dummyBenefitData };
