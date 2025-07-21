import PropTypes from 'prop-types';
import { useState } from 'react';

const BankTransfer = ({ paymentMethod, handlePaymentMethod, errors }) => {
    const bankErrors = errors.bankDetails || {};
    const [transferType, setTransferType] = useState('domestic'); // 'domestic' or 'international';

    const handleTransferTypeChange = (e) => {
        setTransferType(e.target.value);
    };

    // Format account number (groups of 4 digits)
    const formatAccountNumber = (value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    // Format routing number (groups of 3 digits)
    const formatRoutingNumber = (value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.replace(/(\d{3})(?=\d)/g, '$1-').trim();
    };

    // Custom input handler with formatting
    const handleFormattedInput = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Apply formatting based on field type
        if (name === 'bankDetails.accountNumber') {
            formattedValue = formatAccountNumber(value);
        } else if (name === 'bankDetails.routingNumber') {
            formattedValue = formatRoutingNumber(value);
        }

        // Create a synthetic event object to pass to the parent handler
        const syntheticEvent = {
            target: {
                name,
                value: formattedValue
            }
        };

        handlePaymentMethod(syntheticEvent);
    };

    return (
        <section className='w-full h-auto flex flex-col gap-5 px-4'>
            <div className="w-full mb-2">
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="transferType"
                            value="domestic"
                            checked={transferType === 'domestic'}
                            onChange={handleTransferTypeChange}
                            className="mr-2"
                        />
                        Domestic Transfer
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="transferType"
                            value="international"
                            checked={transferType === 'international'}
                            onChange={handleTransferTypeChange}
                            className="mr-2"
                        />
                        International Wire
                    </label>
                </div>
            </div>
            {/* Bank Name Field - New addition */}
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Bank Name"
                    className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                    name='bankDetails.bankName'
                    value={paymentMethod.bankDetails.bankName || ''}
                    onChange={handlePaymentMethod}
                />
                {bankErrors.bankName && <p className='text-sm text-red-500'>{bankErrors.bankName}</p>}
            </div>
            {/* Account Info */}
            <div className="w-full flex gap-5">
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="Account name"
                        className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                        name='bankDetails.accountName'
                        value={paymentMethod.bankDetails.accountName || ''}
                        onChange={handlePaymentMethod}
                    />
                    {bankErrors.accountName && <p className='text-sm text-red-500'>{bankErrors.accountName}</p>}
                </div>
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="Account number"
                        className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                        name='bankDetails.accountNumber'
                        value={paymentMethod.bankDetails.accountNumber || ''}
                        onChange={handleFormattedInput}
                    />
                    {bankErrors.accountNumber && <p className='text-sm text-red-500'>{bankErrors.accountNumber}</p>}
                </div>
            </div>
            {/* Domestic Transfer Fields */}
            {transferType === 'domestic' && (
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Routing number (for US resident)"
                        className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                        name='bankDetails.routingNumber'
                        value={paymentMethod.bankDetails.routingNumber || ''}
                        onChange={handleFormattedInput}
                    />
                    {bankErrors.routingNumber && <p className='text-sm text-red-500'>{bankErrors.routingNumber}</p>}
                </div>
            )}
            {/* International Transfer Fields */}
            {transferType === 'international' && (
                <>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="SWIFT/BIC Code"
                            className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                            name='bankDetails.swiftCode'
                            value={paymentMethod.bankDetails.swiftCode || ''}
                            onChange={handlePaymentMethod}
                        />
                        {bankErrors.swiftCode && <p className='text-sm text-red-500'>{bankErrors.swiftCode}</p>}
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="IBAN (for international transfers)"
                            className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                            name='bankDetails.iban'
                            value={paymentMethod.bankDetails.iban || ''}
                            onChange={handlePaymentMethod}
                        />
                        {bankErrors.iban && <p className='text-sm text-red-500'>{bankErrors.iban}</p>}
                    </div>
                </>
            )}
            {/* Bank Address - New addition */}
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Bank Address"
                    className="w-full p-2 border-b outline-none border-zinc-400 focus:border-primary duration-150 transition-all ease-in-out"
                    name='bankDetails.bankAddress'
                    value={paymentMethod.bankDetails.bankAddress || ''}
                    onChange={handlePaymentMethod}
                />
                {bankErrors.bankAddress && <p className='text-sm text-red-500'>{bankErrors.bankAddress}</p>}
            </div>

            {/* Information notice */}
            <div className="w-full mt-2 text-sm text-zinc-600 bg-zinc-100 p-3 rounded-md">
                <p>Please make your transfer within 48 hours to complete your registration. Include your name in the transfer reference.</p>
                <p className="mt-2 font-semibold">Our Bank Details:</p>
                <p>Bank: Example Bank</p>
                <p>Account: MeetNar Webinars Ltd</p>
                <p>Account #: 1234567890</p>
                {transferType === 'international' && (
                    <>
                        <p>SWIFT/BIC: EXAMPLEBANK</p>
                        <p>IBAN: GB29EXMP60161331926819</p>
                    </>
                )}
            </div>
        </section>
    )
};

BankTransfer.propTypes = {
    paymentMethod: PropTypes.object.isRequired,
    handlePaymentMethod: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default BankTransfer;