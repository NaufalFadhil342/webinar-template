import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ selectedSessions, calculatePrices, calculateTotals, promoDiscount, applyPromoCode }) => {
    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const handlePromoCodeChange = (e) => {
        const newCode = e.target.value;
        setPromoCode(newCode);

        if (newCode === '' && isPromoApplied) {
            applyPromoCode('');
            setIsPromoApplied(false);
        };
    };

    const handleApplyPromoCode = () => {
        if (promoCode.trim() !== '') {
            applyPromoCode(promoCode);
            setIsPromoApplied(true);
        }
    };

    return (
        <section className='w-full h-auto p-6 flex flex-col gap-8 bg-white rounded-xl'>
            <h3 className='text-xl text-zinc-900 font-semibold'>Order Summary</h3>
            <div className='w-full flex flex-col gap-5'>
                <div className='w-full h-auto flex flex-col gap-2'>
                    <div className="w-full flex justify-between items-center text-sm text-zinc-600">
                        <p>Real prices :</p>
                        <div>${calculatePrices()}</div>
                    </div>
                    {isPromoApplied && promoDiscount > 0 && (
                        <div className='w-full flex justify-between items-center text-sm text-zinc-600'>
                            <p>Promo code :</p>
                            <div>{promoDiscount > 0 ? `-$${promoDiscount.toFixed(2)}` : '$0.00'}</div>
                        </div>
                    )}
                </div>
                <div className="w-full py-2 border-t border-zinc-300 flex items-center justify-between text-zinc-900 font-medium">
                    <p className="flex items-center gap-1">Total ({selectedSessions?.length} {selectedSessions?.length === 1 ? 'Session' : 'Sessions'}):</p>
                    <div>${calculateTotals()}</div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between gap-2">
                        <input
                            type="text"
                            placeholder="Type promo code"
                            className={`flex-grow h-auto p-2 border ${isPromoApplied ? 'border-green-500' : 'border-zinc-400'} focus:border-primary rounded-md outline-none text-sm text-zinc-600`}
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                        />
                        <button
                            type="button"
                            className='whitespace-nowrap px-3 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-md text-sm font-medium transition-colors'
                            onClick={handleApplyPromoCode}
                            disabled={promoCode.trim() === ''}
                        >
                            {isPromoApplied ? 'Applied' : 'Apply'}
                        </button>
                    </div>
                    {promoDiscount > 0 && (
                        <p className="text-xs text-green-600">Promo code applied successfully!</p>
                    )}
                </div>
                <div className="w-full h-full">
                    <p className="w-full text-sm text-zinc-600">By completing your purchase, you agree to these <span className="text-primary">Terms of Use</span>.</p>
                </div>
                <div className="w-full h-auto flex justify-center">
                    <button
                        type="submit"
                        className="w-full h-10 px-4 rounded-md bg-primary hover:bg-darkPrimary text-white font-medium duration-150 transition-colors"
                    >
                        Pay ${calculateTotals()}
                    </button>
                </div>
            </div>
        </section>
    )
};

OrderSummary.propTypes = {
    selectedSessions: PropTypes.array,
    calculatePrices: PropTypes.func.isRequired,
    calculateTotals: PropTypes.func.isRequired,
    promoDiscount: PropTypes.number,
    applyPromoCode: PropTypes.func.isRequired
}

export default OrderSummary