import { faker } from '@faker-js/faker';

const dummyTestimonialData = [
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName({ sex: 'female' }),
    testimonial: 'The Webinar was incredibly insightful and engaging. I learned so much and had a great time.',
    job: 'Software Engineer',
    rate: 5,
  },
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName({ sex: 'male' }),
    testimonial: 'I was blown away by the expertise and passion of the speaker. The content was relevant and actionable.',
    job: 'Product Manager',
    rate: 4,
  },
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName({ sex: 'male' }),
    testimonial: 'The Webinar was a game-changer for me. I gained new insights and perspectives that I can apply to my work.',
    job: 'UX Designer',
    rate: 4,
  },
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName(),
    testimonial: 'The Webinar was incredibly insightful and engaging. I learned so much and had a great time.',
    job: 'Software Engineer',
    rate: 5,
  },
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName(),
    testimonial: 'I was blown away by the expertise and passion of the speaker. The content was relevant and actionable.',
    job: 'Product Manager',
    rate: 4,
  },
  {
    id: faker.string.alphanumeric(15),
    name: faker.person.fullName(),
    testimonial: 'The Webinar was a game-changer for me. I gained new insights and perspectives that I can apply to my work.',
    job: 'UX Designer',
    rate: 4,
  },
];

export { dummyTestimonialData };
