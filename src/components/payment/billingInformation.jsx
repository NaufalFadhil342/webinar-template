import { countryCodes } from "../../data/countryCodes";
import PropTypes from 'prop-types';

const BillingInformation = ({ dark, billingInformation, handleBillingInformation, errors }) => {
    return (
        <section className='w-full h-auto flex flex-col gap-8 bg-white rounded-xl p-6'>
            <h3 className='text-xl font-semibold text-zinc-900 leading-none'>Billing Information</h3>
            <section className='flex flex-col gap-5'>
                <div>
                    <input type="text" placeholder='Full name' className='w-full py-3 px-3 bg-transparent border-b border-zinc-400 text-zinc-600 focus:border-primary outline-none' name="fullName" value={billingInformation.fullName} onChange={handleBillingInformation} />
                    {errors.fullName && <p className="text-sm mt-1 text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                    <input type="email" placeholder='Email address' className='w-full py-3 px-3 bg-transparent border-b border-zinc-400 text-zinc-600 focus:border-primary outline-none' name="email" value={billingInformation.email} onChange={handleBillingInformation} />
                    {errors.email && <p className="text-sm mt-1 text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <select
                        className={`w-full h-12 mt-2 px-2 bg-transparent outline-none border-b ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-400 text-zinc-600 focus:border-primary"}`}
                        name="country"
                        value={billingInformation.country}
                        onChange={handleBillingInformation}
                    >
                        <option value="" className={dark ? "bg-zinc-700" : "bg-white"} disabled>Select country</option>
                        {countryCodes.map((country) => (
                            <option value={country.name} key={country.code} className={dark ? "bg-zinc-700 " : "bg-zinc-white"}>{country.name}</option>
                        ))}
                    </select>
                </div>
            </section>
        </section>
    )
};

BillingInformation.propTypes = {
    dark: PropTypes.bool,
    billingInformation: PropTypes.object.isRequired,
    handleBillingInformation: PropTypes.func.isRequired,
    errors: PropTypes.object
}

export default BillingInformation