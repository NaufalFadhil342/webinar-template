import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import historyImg from '../../assets/hero/webinar3.jpg';
import { motion } from 'motion/react';
import { faker } from '@faker-js/faker';

const ourValues = [
  { text: faker.lorem.lines(1) },
  { text: faker.lorem.lines(1) },
  { text: faker.lorem.lines(1) }
]

const OurHistory = ({ dark }) => {

  return (
    <div
      className={`w-full h-auto flex flex-col-reverse sm:flex-row-reverse gap-8 py-24 px-[8%] transition-colors duration-300 ${dark ? "bg-zinc-800" : "bg-white"
        }`}
      id='about'
      aria-label="Our History Section"
    >
      <div className='w-full h-auto flex items-center'>
        <div className={`w-full h-[40vh] lg:h-full border-4 transition-colors duration-300 ${dark ? 'border-secondary' : 'border-primary'
          } rounded-xl overflow-hidden`}>
          <div
            className='w-full h-full bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${historyImg})` }}
            role="img"
            aria-label="Webinar session in progress"
          />
        </div>
      </div>
      <div className="w-full h-full py-10 flex flex-col gap-4 overflow-x-hidden">
        <motion.span
          className={`text-[15px] italic transition-colors duration-300 ${dark ? 'text-secondary' : 'text-primary'
            }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          aria-label="About Us Section"
        >
          About Us
        </motion.span>
        <motion.h1
          className={`text-4xl uppercase tracking-wide font-bold transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
            }`}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Empowering Connections Through Innovative Webinar Solutions for Everyone
        </motion.h1>
        <motion.p
          className={`transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
            }`}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur placeat mollitia, possimus animi repellendus eaque deserunt nam distinctio ex illum quas harum perferendis rem cupiditate quae ullam, illo dolore voluptas.
        </motion.p>
        <ul className='flex flex-col gap-2'>
          {ourValues.map((value, index) => (
            <motion.li
              key={index}
              className={`flex items-center gap-1 transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.75 * (index + 1) }}
              aria-label={`History Point ${index + 1}`}
            >
              <Icon
                path={mdiCheck}
                size={1.25}
                className={dark ? "text-secondary" : "text-primary"}
                aria-hidden="true"
              />
              <>{value.text}</>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

OurHistory.propTypes = {
  dark: PropTypes.bool.isRequired
}

export default OurHistory;
