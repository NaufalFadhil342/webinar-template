/**
 * Here are the place of header content that we can call globally and dynamically.
 * We have configuration for handling payment gateway for development.
 * In real app the configuration properly setted in the backend.
 */

const SUPPORT_HEADER = {
  title: 'Support Center',
  description: "Your go-to resource for all webinar related inquiries and assistance. We're here to help. If you have any questions or need further assistance, please don't hesitate to contact us.",
};

const TESTIMONIALS_HEADER = {
  title: 'Testimonials Page',
  description: 'Our webinars have transformed the way participants engage with content. Hear firsthand how these sessions have empowered individuals to achieve their goals.',
};

const ABOUT_HEADER = {
  title: 'Empowering Your Learning Journey',
  description: 'We connect individuals through engaging webinars, workshops, and online courses that inspire growth, foster community learning, and provide valuable opportunities for networking and skill-building.',
};

const CAREERS_HEADER = {
  title: 'Join Our Team',
  description: 'Explore exciting career opportunities in a dynamic environment that values innovation and collaboration.',
};

const FAQS_HEADER = {
  title: 'Webinar FAQs',
  description: "Welcome to our FAQ page! Here, you'll find answers to common questions about our webinars, helping you make the most of your experience.",
};

const COMMUNITY_HEADER = {
  title: 'Join Our Vibrant Community!',
  description: 'Dive into exciting discussions on lifestyle, social trends, and leisure. Share your voice and connect with like-minded people!',
};

const BLOG_HEADER = {
  title: 'Discover Insights and Inspiration',
  description: 'Explore our blog for insights, tips, and stories related to our webinars and community.',
};

const BLOG_DETAIL_HEADER = {
  title: 'Blog Detail',
  description: 'Dive deeper into our blog posts for in-depth insights and discussions.',
};

const SPEAKERS_HEADER = {
  title: 'Meet Our Speakers',
  description: 'Get to know the visionaries, industry leaders, and inspiring voices behind our sessions. Our lineup features experts from diverse fields who are here to share insights, spark ideas, and empower your journey.',
};

const SESSIONS_HEADER = {
  title: 'Sessions Header',
  description:
    "Browse and register for upcoming webinars hosted by industry experts. Each session includes speaker details, time slots, and a brief overview of what you'll learn. Click on register to set your slot in the upcoming webinar or add to my schedule if you want to wishlist.",
};

const PAYMENT_HEADER = {
  title: 'Payment Gateway',
};

const EVENTS_HEADER = {
  title: 'Upcoming Events',
};

const WISHLIST_HEADER = {
  title: 'My Wishlist',
  description: 'Your saved sessions for future learning',
};

const WEBINARLIVE_HEADER = {
  title: 'Live Webinars',
  description: 'Discover and join interactive learning sessions from industry experts',
};

const RECORDED_HEADER = {
  title: 'Watch Previous Sessions',
  description: 'Browse through our collection of recorded webinars and catch up on what you missed.',
};

const paymentConfig = {
  environment: import.meta.env.VITE_NODE_ENV || 'development',
  get isDevelopment() {
    return this.environment === 'development';
  },
  get isProduction() {
    return this.environment === 'production';
  },
  validation: {
    enableLuhnCheck: import.meta.env.VITE_NODE_ENV === 'production',
    enableStrictValidation: import.meta.env.VITE_NODE_ENV === 'production',
  },
  testCards: {
    visa: '4111111111111111',
    mastercard: '5555555555554444',
    amex: '378282246310005',
    discover: '6011111111111117',
  },
  devModeEnabled: import.meta.env.VITE_DEV_MODE === 'true',
};

export {
  SUPPORT_HEADER,
  TESTIMONIALS_HEADER,
  ABOUT_HEADER,
  CAREERS_HEADER,
  FAQS_HEADER,
  COMMUNITY_HEADER,
  BLOG_HEADER,
  BLOG_DETAIL_HEADER,
  SPEAKERS_HEADER,
  SESSIONS_HEADER,
  PAYMENT_HEADER,
  EVENTS_HEADER,
  WISHLIST_HEADER,
  WEBINARLIVE_HEADER,
  RECORDED_HEADER,
  paymentConfig,
};
