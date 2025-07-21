import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { motion } from "motion/react";
import PropTypes from 'prop-types';

const HowItWorksDetail = ({ title, text, image, dark }) => {
  return (
    <motion.section
      className={`w-full h-auto shadow-md rounded-xl transition-colors duration-300 ${dark ? 'bg-zinc-600' : 'bg-white'
        }`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
      aria-label={`How It Works Detail: ${title}`}
    >
      <div className="w-full h-60 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-4/5 h-auto object-cover object-center"
          loading="lazy"
          aria-label={`Illustration for ${title}`}
        />
      </div>
      <div className="w-full h-auto py-6 px-4 flex flex-col items-center text-center gap-4">
        <h3 className={`text-xl font-medium transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
          }`}>
          {title}
        </h3>
        <p className={`text-sm transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
          }`}>
          {text}
        </p>
        <Link
          className={`w-auto h-auto flex items-center text-[15px] transition-all duration-150 ${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-600 hover:text-primary'
            }`}
          aria-label={`Learn more about ${title}`}
        >
          Learn More
          <Icon path={mdiChevronRight} size={1} />
        </Link>
      </div>
    </motion.section>
  );
}

HowItWorksDetail.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  dark: PropTypes.bool
}

export default HowItWorksDetail;
