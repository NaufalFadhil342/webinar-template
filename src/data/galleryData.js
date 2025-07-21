import { faker } from '@faker-js/faker';
import gallery1 from '../assets/images/networking.jpg';
import gallery2 from '../assets/images/recording.jpg';
import gallery3 from '../assets/images/speakers.jpg';
import gallery4 from '../assets/hero/webinar1.jpg';
import gallery5 from '../assets/hero/webinar2.jpg';
import gallery6 from '../assets/hero/webinar3.jpg';
import gallery7 from '../assets/hero/webinar4.jpg';
import gallery8 from '../assets/hero/webinar5.jpg';
import gallery9 from '../assets/hero/webinar6.jpg';
import gallery10 from '../assets/hero/webinar7.jpg';

const galleryData = [
  {
    id: faker.string.alphanumeric(10),
    image: gallery1,
    label: 'Gallery 1',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery2,
    label: 'Gallery 2',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery3,
    label: 'Gallery 3',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery4,
    label: 'Gallery 4',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery5,
    label: 'Gallery 5',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery6,
    label: 'Gallery 6',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery7,
    label: 'Gallery 7',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery8,
    label: 'Gallery 8',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery9,
    label: 'Gallery 9',
  },
  {
    id: faker.string.alphanumeric(10),
    image: gallery10,
    label: 'Gallery 10',
  },
];

export { galleryData };
