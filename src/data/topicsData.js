import image1 from '../assets/hero/webinar2.jpg';
import image2 from '../assets/hero/webinar4.jpg';
import image3 from '../assets/hero/webinar6.jpg';
import { faker } from '@faker-js/faker';

const topicsData = [
  {
    id: faker.string.alphanumeric(18),
    label: 'Get Help with Common Webinar Challanges and Solutions',
    text: faker.lorem.words(8),
    image: image1,
  },
  {
    id: faker.string.alphanumeric(18),
    label: 'Troubleshooting Common Webinar Issues: Quick Fixes and  Tips',
    text: faker.lorem.words(8),
    image: image2,
  },
  {
    id: faker.string.alphanumeric(18),
    label: 'Maximize Engagement: Best Practices for Interactive Webinars',
    text: faker.lorem.words(8),
    image: image3,
  },
];

export { topicsData };
