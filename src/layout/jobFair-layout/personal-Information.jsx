import PropTypes from 'prop-types';
import { countryCodes } from '../../data/countryCodes';

const PersonalInformation = ({ jobFairForm, handleJobFair, dark, errors }) => {

    return (
        <main className="w-full h-auto flex flex-col gap-8">
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Personal Information</h1>
            <section className="w-full h-auto">
                <label htmlFor="fullName" className={`after:content-['*'] after:mx-1 after:text-red-500 ${dark ? 'text-white font-medium' : 'text-zinc-900 font-medium'}`}>Full Name</label>
                <input type="text" id="fullName" name="fullName" value={jobFairForm.fullName} onChange={handleJobFair} className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`} />
                {errors.fullName && <p className='mt-1 text-red-500 block'>{errors.fullName}</p>}
            </section>
            <section className="w-full h-auto flex items-center gap-6">
                <div className="w-full h-auto">
                    <label htmlFor="email" className={`after:content-['*'] after:mx-1 after:text-red-500 ${dark ? "text-white" : "text-zinc-900"}`}>Email Address</label>
                    <input type="email" id="email" name="email" value={jobFairForm.email} onChange={handleJobFair} className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`} />
                    {errors.email && <p className='mt-1 text-red-500 block'>{errors.email}</p>}
                </div>
                <div className="w-full h-auto">
                    <label htmlFor="phoneNumber" className={`after:content-['*'] after:mx-1 after:text-red-500 ${dark ? 'text-white font-medium' : 'text-zinc-900 font-medium'}`}>Phone Number</label>
                    <input
                        type="tel"
                        id='phoneNumber'
                        name="phoneNumber"
                        value={jobFairForm.phoneNumber}
                        onChange={handleJobFair}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        inputMode='numeric'
                        className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`}
                    />
                    {errors.phoneNumber && <p className='mt-1 text-red-500 block'>{errors.phoneNumber}</p>}
                </div>
            </section>
            <section className='w-full h-auto'>
                <label htmlFor="address" className={dark ? 'text-white font-medium' : 'font-medium text-zinc-900'}>Address</label>
                <input type="text" id='address' name='address' value={jobFairForm.address} onChange={handleJobFair} className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`} />
            </section>
            <section className='w-full h-auto flex items-center gap-6'>
                <div className='w-full h-auto'>
                    <label htmlFor="city" className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>City</label>
                    <input type="text" id='city' name='city' value={jobFairForm.city} onChange={handleJobFair} className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`} />
                </div>
                <div className='w-full h-auto'>
                    <label htmlFor="postalCode" className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Postal Code</label>
                    <input
                        type="text"
                        id='postalCode'
                        name='postalCode'
                        value={jobFairForm.postalCode}
                        onChange={handleJobFair}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z0-9\s-]/g, '')}
                        className={`w-full h-12 mt-2 border-b-2 ${dark ? "border-zinc-300 focus:border-secondary text-zinc-300" : "border-zinc-600 focus:border-primary text-zinc-600"} flex items-center px-2 bg-transparent outline-none`} />
                </div>
            </section>
            <section className='w-full h-auto flex flex-col'>
                <label htmlFor="country" className={`after:content-['*'] after:ml-2 after:text-red-500 ${dark ? "text-white font-medium" : "text-zinc-900 font-medium"}`}>Country</label>
                <select
                    name="country"
                    id="country"
                    value={jobFairForm.country}
                    onChange={handleJobFair}
                    className={`w-full h-12 mt-2 px-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                >
                    <option value="" className={dark ? "bg-zinc-700" : "bg-white"} disabled>Select country</option>
                    {countryCodes.map((country) => (
                        <option value={country.name} key={country.code} className={dark ? "bg-zinc-700 " : "bg-zinc-white"}>{country.name}</option>
                    ))}
                </select>
            </section>
        </main>
    )
};

PersonalInformation.propTypes = {
    jobFairForm: PropTypes.object.isRequired,
    handleJobFair: PropTypes.func.isRequired,
    dark: PropTypes.bool,
    errors: PropTypes.object
}

export default PersonalInformation;