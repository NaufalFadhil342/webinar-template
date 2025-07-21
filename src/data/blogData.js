import { faker } from '@faker-js/faker';
import techImg from '../assets/images/technology.jpg';
import healthImg from '../assets/images/health.jpg';
import lifestyleImg from '../assets/images/lifestyle.jpg';
import travelImg from '../assets/images/travel.jpg';
import foodImg from '../assets/images/food.jpg';

const DUMMY_CATEGORIES = [
  {
    id: 1,
    name: 'Technology',
    amount: 24,
  },
  {
    id: 2,
    name: 'Health',
    amount: 19,
  },
  {
    id: 3,
    name: 'Lifestyle',
    amount: 15,
  },
  {
    id: 4,
    name: 'Travel',
    amount: 12,
  },
  {
    id: 5,
    name: 'Food',
    amount: 8,
  },
];

const DUMMY_POPULARPOST = [
  {
    image: faker.image.url(),
    title: 'The Future of AI: Trends to Watch in 2025',
    category: 'Technology',
    published: 'March 18, 2025',
    author: faker.person.fullName(),
    avatar: faker.image.url(),
  },
  {
    image: faker.image.url(),
    title: 'Top 10 Travel Destinations for 2025',
    category: 'Travel',
    published: 'March 10, 2025',
    author: faker.person.fullName(),
    avatar: faker.image.url(),
  },
  {
    image: faker.image.url(),
    title: 'The Benefits of Mindfulness Meditation',
    category: 'Health',
    published: 'March 5, 2025',
    author: faker.person.fullName(),
    avatar: faker.image.url(),
  },
];

const DUMMY_ARTICLES = [
  {
    id: 'the-rise-of-quantum-computing',
    category: 'Technology',
    title: 'The Rise of Quantum Computing',
    image: techImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
  {
    id: 'the-benefits-of-a-plant-based-diet',
    category: 'Health',
    title: 'The Benefits of a Plant-Based Diet',
    image: healthImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
  {
    id: 'minimalism-a-guide-to-simplifying-your-life',
    category: 'Lifestyle',
    title: 'Minimalism: A Guide to Simplifying Your Life',
    image: lifestyleImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
  {
    id: 'exploring-the-hidden-gems-of-europe',
    category: 'Travel',
    title: 'Exploring the Hidden Gems of Europe',
    image: travelImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
  {
    id: 'the-art-of-french-cooking',
    category: 'Food',
    title: 'The Art of French Cooking: A Culinary Journey',
    image: foodImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
  {
    id: 'the-benefits-of-journaling-for-mental-health',
    category: 'Lifestyle',
    title: 'The Benefits of Journaling for Mental Health',
    image: lifestyleImg,
    description: faker.lorem.paragraphs(),
    published: faker.date.past(1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    contentSections: [`${faker.lorem.paragraphs(3)}`, `${faker.lorem.paragraphs(3)}`],
    author: faker.person.fullName(),
  },
];

export { DUMMY_CATEGORIES, DUMMY_POPULARPOST, DUMMY_ARTICLES };
