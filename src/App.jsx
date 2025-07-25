import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './components/navbar';
import Loading from './UI/loading';
import AddComment from './layout/discuss-layout/main-content/addComment';
import AddReply from './layout/discuss-layout/main-content/addReply';

const Footer = lazy(() => import('./components/footer'));
const Home = lazy(() => import('./pages/homepage/home'));
const AboutUs = lazy(() => import('./pages/aboutpage/aboutUs'));
const ContactUs = lazy(() => import('./pages/contactpage/contactUs'));
const FaqPage = lazy(() => import('./pages/faqpage'));
const SupportPage = lazy(() => import('./pages/supportpage'));
const TestimonialsPage = lazy(() => import('./pages/testimonialspage'));
const CareersPage = lazy(() => import('./pages/careerspage'));
const RegisterPage = lazy(() => import('./pages/registerPage'));
const PaymentPage = lazy(() => import('./pages/paymentPage'));
const JobFairPage = lazy(() => import('./pages/jobFair-page'));
const CommunityPage = lazy(() => import('./pages/communityPage'));
const BlogPage = lazy(() => import('./pages/blogpage'));
const BlogDetail = lazy(() => import('./pages/blogpage/blogDetail'));
const SpeakersPage = lazy(() => import('./pages/speakersPage'));
const SpeakerDetail = lazy(() => import('./layout/speakers-layout/speakerDetail'));
const UpcomingEventsPage = lazy(() => import('./pages/upcomingEventsPage'));
const WishlistPage = lazy(() => import('./pages/wishlistPage'));
const WebinarLivePage = lazy(() => import('./pages/webinarLivePage'));
const RecordedPage = lazy(() => import('./pages/recordedPage'));
const ResultPage = lazy(() => import('./pages/resultPage'));

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > documentHeight * 0.08) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [])

  const toggleDarkMode = () => setDark(!dark);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`w-full h-auto ${dark ? 'bg-zinc-700' : 'bg-zinc-200/50'}`}>
      {/* navbar */}
      <Navbar isScrolled={isScrolled} dark={dark} toggleDark={toggleDarkMode} homePage={true} />
      <Suspense fallback={<div className={`w-full h-full ${dark ? 'bg-zinc-900' : 'bg-white'} fixed z-10 left-0 flex items-center justify-center`}><Loading dark={dark} /></div>}>
        {/* content */}
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path='/aboutus' element={<AboutUs dark={dark} />} />
          <Route path='/contactus' element={<ContactUs dark={dark} />} />
          <Route path='/faq' element={<FaqPage dark={dark} />} />
          <Route path='/support' element={<SupportPage dark={dark} />} />
          <Route path='/testimonials' element={<TestimonialsPage dark={dark} />} />
          <Route path='/careers' element={<CareersPage dark={dark} />} />
          <Route path='/careers/:id' element={<JobFairPage dark={dark} />} />
          <Route path='/register' element={<RegisterPage dark={dark} />} />
          <Route path='/payment' element={<PaymentPage dark={dark} />} />
          <Route path='/discuss' element={<CommunityPage dark={dark} />}>
            <Route path=':discussId' element={<AddComment dark={dark} />} />
            <Route path=':discussId/:commentId' element={<AddReply dark={dark} />} />
          </Route>
          <Route path='/blog' element={<BlogPage dark={dark} />} />
          <Route path='/blog/:blogId' element={<BlogDetail dark={dark} />} />
          <Route path='/speakers' element={<SpeakersPage dark={dark} />} />
          <Route path='/speakers/:speakerId' element={<SpeakerDetail dark={dark} />} />
          <Route path='/events' element={<UpcomingEventsPage dark={dark} />} />
          <Route path='/live' element={<WebinarLivePage dark={dark} />} />
          <Route path='/wishlist' element={<WishlistPage dark={dark} />} />
          <Route path='/recorded' element={<RecordedPage dark={dark} />} />
          <Route path='/result' element={<ResultPage dark={dark} />} />
        </Routes>

        {/* footer */}
        <Footer dark={dark} />
      </Suspense>
    </div>
  );
};

export default App;
