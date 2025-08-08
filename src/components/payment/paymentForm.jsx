import React from 'react';
import Form from '../../UI/form';
import BillingInformation from './billingInformation';
import PaymentMethod from './paymentMethods';
import OrderDetails from './orderDetails';
import OrderSummary from './orderSummary';
import PropTypes from 'prop-types';

const PaymentForm = ({
    submitForm,
    dark,
    paymentState,
    handlePaymentChange,
    errors,
    calculateTotals,
    calculatePrices,
    handleTransferTypeChange,
    isSubmitting,
    selectedSessions,
    promoDiscount,
    applyPromoCode
}) => {
    return (
        <Form className='w-full h-auto flex gap-10' submitForm={submitForm}>
            <div className='flex-[60%] w-full h-auto flex flex-col gap-10'>
                <BillingInformation dark={dark} billingInformation={paymentState} handleBillingInformation={handlePaymentChange} errors={errors} />
                <PaymentMethod calculateTotals={calculateTotals} paymentMethod={paymentState} handlePaymentMethod={handlePaymentChange} errors={errors} handleTransferTypeChange={handleTransferTypeChange} isSubmitting={isSubmitting} />
            </div>
            <div className='flex-[40%] w-full h-auto flex flex-col gap-10'>
                <OrderDetails selectedSessions={selectedSessions} calculatePrices={calculatePrices} />
                <OrderSummary
                    selectedSessions={selectedSessions}
                    calculatePrices={calculatePrices}
                    calculateTotals={calculateTotals}
                    promoDiscount={promoDiscount}
                    applyPromoCode={applyPromoCode}
                    isSubmitting={isSubmitting}
                />
            </div>
        </Form>
    )
}

PaymentForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    dark: PropTypes.bool,
    paymentState: PropTypes.object.isRequired,
    handlePaymentChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    calculateTotals: PropTypes.func.isRequired,
    calculatePrices: PropTypes.func.isRequired,
    handleTransferTypeChange: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    selectedSessions: PropTypes.array.isRequired,
    promoDiscount: PropTypes.number,
    applyPromoCode: PropTypes.func.isRequired
}

export default PaymentForm