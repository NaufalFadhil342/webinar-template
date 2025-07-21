import { mdiAccountMultiple, mdiForum, mdiReply, mdiMessageAlert } from '@mdi/js';
import { faker } from '@faker-js/faker';

export const DUMMY_DISCUSSSTATS = [
  {
    icon: mdiAccountMultiple,
    amounts: 34,
    text: 'Registered users',
  },
  {
    icon: mdiForum,
    amounts: 15,
    text: 'Forums',
  },
  {
    icon: mdiMessageAlert,
    amounts: 6,
    text: 'Topics',
  },
  {
    icon: mdiReply,
    amounts: 15,
    text: 'Replies',
  },
];

export const DUMMY_TOPICS = [
  {
    id: faker.string.alphanumeric(10),
    imagePict: faker.image.url(),
    namePict: faker.person.fullName(),
    published: '3 days ago',
    topic: {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    comment: [],
  },
];

export const DUMMY_ACTIVITY = [
  {
    name: faker.person.fullName(),
    activity: 'Created topic',
    mentioned: 'Lorem ipsum',
    createdAt: '3 hours ago',
    profilePict: faker.image.urlPicsumPhotos(),
  },
  {
    name: faker.person.fullName(),
    activity: 'Commented on',
    mentioned: 'Upcoming Webinar',
    createdAt: '5 hours ago',
    profilePict: faker.image.urlPicsumPhotos(),
  },
  {
    name: faker.person.fullName(),
    activity: 'Replied to',
    mentioned: 'Meeting notes',
    createdAt: '10 hours ago',
    profilePict: faker.image.urlPicsumPhotos(),
  },
];

export const DUMMY_CONTRIBUTORS = [
  {
    id: faker.string.alphanumeric(8),
    userPict: faker.image.urlPicsumPhotos(),
    userName: faker.person.fullName(),
    amounts: 42,
  },
  {
    id: faker.string.alphanumeric(8),
    userPict: faker.image.urlPicsumPhotos(),
    userName: faker.person.fullName(),
    amounts: 36,
  },
  {
    id: faker.string.alphanumeric(8),
    userPict: faker.image.urlPicsumPhotos(),
    userName: faker.person.fullName(),
    amounts: 30,
  },
];
