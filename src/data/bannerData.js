import webinar1 from '../assets/hero/webinar1.jpg';
import webinar2 from '../assets/hero/webinar2.jpg';
import webinar3 from '../assets/hero/webinar3.jpg';
import webinar4 from '../assets/hero/webinar4.jpg';
import { faker } from '@faker-js/faker';

const dummyBannerData = [
  {
    id: faker.string.alphanumeric(15),
    title: 'Front-End Developer',
    description:
      'Master the core principles of front-end development, including HTML, CSS, and JavaScript, to create responsive and interactive web applications. Gain the skills needed to bring designs to life and deliver seamless user experiences.',
    image: webinar3,
    narasumber: 'Alfie Morton',
    majority: 'Developer and Lead Instructor',
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Back-End Developer',
    description: 'Dive into the essentials of back-end development, focusing on server-side programming, database management, and API integration. Build the foundation to develop robust and scalable web applications.',
    image: webinar1,
    narasumber: 'Joshua Burgess',
    majority: 'Developer and Lead Instructor',
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Full-Stack Developer',
    description:
      'Explore the fundamentals of full-stack development, mastering both front-end and back-end technologies. Learn to design, develop, and deploy complete web applications, and take the first step toward becoming a versatile full-stack developer.',
    image: webinar4,
    narasumber: 'Dominic Berry',
    majority: 'Developer and Lead Instructor',
  },
  {
    id: faker.string.alphanumeric(15),
    title: 'Mobile Developer',
    description: 'Discover the essentials of mobile development, including UI/UX design, platform-specific frameworks, and app deployment. Start your journey to creating innovative and user-friendly mobile applications.',
    image: webinar2,
    narasumber: 'Eleanor Chapman',
    majority: 'Developer and Lead Instructor',
  },
];

export { dummyBannerData };
