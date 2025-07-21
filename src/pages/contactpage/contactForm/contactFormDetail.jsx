import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { countryCodes } from '../../../data/countryCodes';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';

const ContactFormDetail = ({
  dark,
  contactForm,
  setContactForm,
  handleContactForm,
  errors,
  isSubmitting,
  roles
}) => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [countryText, setCountryText] = useState('');
  const countryRef = useRef();

  const toggleCountry = (active) => {
    setActiveCountry((prev) => prev === active ? null : active);
  };

  const handleOutsideClick = useCallback((event) => {
    if (countryRef.current && !countryRef.current.contains(event.target)) {
      setActiveCountry(null);
    }
  }, []);

  const handleSelectedCountry = useCallback((country) => {
    setContactForm((prev) => ({
      ...prev,
      selectedCountry: country
    }))
    setActiveCountry(null);
  }, [setContactForm]);

  const filterCountry = countryCodes.filter(country =>
    country.name.toLowerCase().includes(countryText.toLowerCase()) ||
    country.code.toLowerCase().includes(countryText.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <>
      <section className='w-full h-auto flex flex-col md:flex-row gap-8 justify-between'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <label className={dark ? "font-medium text-white" : 'font-medium text-zinc-600'} htmlFor='firstName' aria-label='first name'>First Name *</label>
          <input
            className={`
              w-full h-10 pl-2 text-sm border rounded bg-transparent 
              ${dark
                ? "border-zinc-300 text-zinc-300 outline-secondary"
                : "border-zinc-500 text-zinc-600 outline-primary"
              }
              ${errors.firstName ? "border-red-500" : ""}
          `}
            type="text"
            id='firstName'
            name='firstName'
            value={contactForm.firstName}
            onChange={handleContactForm}
            aria-required="true"
            aria-invalid={!contactForm.firstName}
            aria-describedby='firstName-error'
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-red-500 text-sm">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className='w-full h-auto flex flex-col gap-2'>
          <label className={dark ? "font-medium text-white" : 'font-medium text-zinc-600'} htmlFor="lastName" aria-label='last name'>Last Name *</label>
          <input
            className={`
              w-full h-10 pl-2 text-sm border rounded bg-transparent 
              ${dark
                ? "border-zinc-300 text-zinc-300 outline-secondary"
                : "border-zinc-500 text-zinc-600 outline-primary"
              }
              ${errors.lastName ? "border-red-500" : ""}
          `}
            type='text'
            id='lastName'
            name='lastName'
            value={contactForm.lastName}
            onChange={handleContactForm}
            aria-required="true"
            aria-invalid={!contactForm.lastName}
            aria-describedby="lastName-error"
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-red-500 text-sm">
              {errors.lastName}
            </p>
          )}
        </div>
      </section>
      <section className='w-full h-auto flex flex-col md:flex-row gap-8 justify-between'>
        <div className='w-full h-auto flex flex-col gap-2'>
          <label className={dark ? "font-medium text-white" : 'font-medium text-zinc-600'} htmlFor='email' aria-label='your email'>Your Email *</label>
          <input
            className={`
              w-full h-10 pl-2 text-sm border rounded bg-transparent 
              ${dark
                ? "border-zinc-300 text-zinc-300 outline-secondary"
                : "border-zinc-500 text-zinc-600 outline-primary"
              }
              ${errors.lastName ? "border-red-500" : ""}
          `}
            type="email"
            id='email'
            name='email'
            value={contactForm.email}
            onChange={handleContactForm}
            aria-required="true"
            aria-invalid={!contactForm.email}
            aria-describedby='email-error'
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}
        </div>
        <div className='w-full h-auto flex flex-col gap-2' ref={countryRef}>
          <label htmlFor="country" className={dark ? "font-medium text-white" : 'font-medium text-zinc-600'} aria-label='country'>Your Country *</label>
          <section
            className={`w-full h-10 flex pl-2 items-center justify-between rounded bg-transparent border relative ${dark ? "border-zinc-300" : "border-zinc-500"}`}
            aria-label='country selector'
            role="combobox"
            aria-expanded={activeCountry === 'country'}
            aria-haspopup="listbox"
          >
            <p
              className={`${dark ? "text-zinc-300" : 'text-zinc-600'} text-sm`}
              aria-live="polite"
            >
              {contactForm.selectedCountry ? contactForm.selectedCountry : 'Select a country'}
            </p>
            {activeCountry === 'country' &&
              <div
                className={`w-full h-[25rem] flex flex-col absolute rounded p-4 ${dark ? "bg-zinc-900" : "bg-white"} top-12 left-0`}
                role="listbox"
                aria-label='country list'
              >
                <input
                  type="text"
                  className={`text-sm w-full h-auto mb-2 bg-transparent py-2 pl-2 border ${dark ? 'outline-secondary border-zinc-300 text-zinc-300' : 'text-zinc-600 outline-primary border-zinc-500'} rounded`}
                  placeholder='Type your country'
                  value={countryText}
                  onChange={(e) => setCountryText(e.target.value)}
                  aria-label="Search country"
                />
                <ul className="overflow-y-auto overflow-x-hidden custom-scrollbar">
                  {filterCountry.map((country, index) => (
                    <li
                      key={index}
                      className={`w-full h-auto flex items-center bg-transparent ${dark ? "text-zinc-300 hover:bg-secondary/20" : " text-zinc-600 hover:bg-primary/20"} cursor-default p-1`}
                      onClick={() => handleSelectedCountry(country.name)}
                      role="option"
                      aria-selected={contactForm.selectedCountry === country.name}
                    >
                      <span className='w-full flex-20'>{country.dial_code}</span>
                      <span className='w-full flex-80'>{country.name}</span>
                    </li>
                  ))}
                </ul>
              </div>}
            <button
              className={`w-auto h-full flex items-center hover:cursor-pointer ${dark ? "text-zinc-300" : "text-zinc-600"}`}
              onClick={() => toggleCountry('country')}
              aria-label="Toggle country dropdown"
            >
              <Icon path={mdiMenuDown} size={1} />
            </button>
          </section>
          {errors.selectedCountry && (
            <p id="selectedCountry-error" className="text-red-500 text-sm">
              {errors.selectedCountry}
            </p>
          )}
        </div>
      </section>
      <section className='w-full h-auto flex flex-col gap-2'>
        <label className={dark ? "font-medium text-white" : "font-medium text-zinc-600"}>Your Role in Webinars *</label>
        <ul className='w-full h-auto grid grid-cols-2 gap-y-2'>
          {roles.map((role) => (
            <li key={role} className='w-full h-auto flex items-center justify-start gap-2'>
              <input
                className={`size-4 rounded-full border ${dark ? "border-zinc-300" : "border-zinc-700"}`}
                type="radio"
                id={role}
                name="role"
                value={role}
                checked={contactForm.role === role}
                onChange={handleContactForm}
              />
              <label className={dark ? "text-zinc-300" : 'text-zinc-600'} htmlFor={role} aria-label={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</label>
            </li>
          ))}
          {errors.role && <p id='role-error' className='text-red-500'>{errors.role}</p>}
        </ul>
      </section>
      <section className='w-full h-auto flex flex-col gap-2'>
        <label className={dark ? "text-zinc-300 font-medium" : "text-zinc-600 font-medium"} htmlFor="message" aria-label='message'>Message *</label>
        <textarea
          className={`w-full h-32 rounded border bg-transparent pt-2 pl-2 text-sm ${dark ? "border-zinc-300 outline-secondary text-zinc-300" : "border-zinc-500 outline-primary text-zinc-600"}`}
          name="message"
          id="message"
          value={contactForm.message}
          onChange={handleContactForm}
          aria-required='true'
          aria-invalid={!contactForm.message}
          aria-describedby='message-error'
        />
        {errors.message && <p id='message-error' className='text-red-500'>{errors.message}</p>}
      </section>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
                    w-auto h-12 px-4 mt-4 flex items-center justify-center rounded 
                    ${dark
            ? 'bg-secondary hover:bg-[#eb4770]'
            : 'bg-primary hover:bg-darkPrimary'
          } 
                    text-white transition-all duration-150 
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </>
  )
};

ContactFormDetail.propTypes = {
  dark: PropTypes.bool,
  contactForm: PropTypes.object.isRequired,
  setContactForm: PropTypes.func.isRequired,
  handleContactForm: PropTypes.func.isRequired,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default ContactFormDetail;
