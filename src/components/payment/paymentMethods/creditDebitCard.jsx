import PropTypes from 'prop-types';
import { useState } from 'react';
import { detectCardTypes, formatCardNumber } from '../../../utils/helper';

const CreditDebitCard = ({ paymentMethod, handlePaymentMethod, errors }) => {
    const cardErrors = errors.cardDetails || {};
    const [cardType, setCardType] = useState('unknown')

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        const formattedValue = formatCardNumber(input);

        const detectedType = detectCardTypes(input);
        setCardType(detectedType);

        const syntheticEvent = {
            target: {
                name: 'cardDetails.cardNumber',
                value: formattedValue
            }
        };

        handlePaymentMethod(syntheticEvent);
    };

    return (
        <div className='w-full h-auto flex flex-col gap-5 px-4'>
            <input
                type="text"
                placeholder='Card number (1234 5678 9012 3456)'
                className='text-sm border-b border-zinc-400 p-2 focus:border-primary outline-none' name="cardDetails.cardNumber"
                value={paymentMethod.cardDetails.cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
            />
            {cardType !== 'unknown' && (
                <span className="absolute right-2 top-2">
                    {/* Here you would add card type icons based on cardType */}
                    {cardType}
                </span>
            )}
            {cardErrors.cardNumber && <p className='text-red-500 text-sm'>{cardErrors.cardNumber}</p>}
            <div className='flex items-center gap-5'>
                <div className='w-full h-auto'>
                    <input
                        type="month"
                        className='text-sm border-b border-zinc-400 p-2 focus:border-primary outline-none'
                        name='cardDetails.expiryDate'
                        value={paymentMethod.cardDetails.expiryDate}
                        onChange={handlePaymentMethod}
                        min={new Date().toISOString().slice(0, 7)}
                    />
                    {cardErrors.expiryDate && <p className='text-sm text-red-500'>{cardErrors.expiryDate}</p>}
                </div>
                <div className='w-full h-auto'>
                    <input
                        type="text"
                        placeholder='CVC/CVV'
                        className='text-sm border-b border-zinc-400 p-2 focus:border-primary outline-none'
                        name='cardDetails.cvv'
                        value={paymentMethod.cardDetails.cvv}
                        onChange={handlePaymentMethod}
                        maxLength="4"
                        pattern="\d*"
                    />
                    {cardErrors.cvv && <p className='text-sm text-red-500'>{cardErrors.cvv}</p>}
                </div>
            </div>
            <input
                type="text"
                placeholder='Cardholder name'
                className='text-sm border-b border-zinc-400 p-2 focus:border-primary outline-none' name='cardDetails.cardholderName'
                value={paymentMethod.cardDetails.cardholderName}
                onChange={handlePaymentMethod}
            />
            <div className="flex items-center gap-2 text-zinc-600">
                <input
                    type="checkbox"
                    className="size-4"
                    name='cardDetails.saveCard'
                    checked={paymentMethod.cardDetails.saveCard}
                    onChange={(e) => {
                        const syntheticEvent = {
                            target: {
                                name: 'cardDetails.saveCard',
                                value: e.target.checked
                            }
                        };
                        handlePaymentMethod(syntheticEvent)
                    }}
                />
                <>Save this card secure to my next order</>
            </div>
        </div>
    )
};

CreditDebitCard.propTypes = {
    handlePaymentMethod: PropTypes.func.isRequired,
    paymentMethod: PropTypes.object.isRequired,
    errors: PropTypes.object
};

export default CreditDebitCard;