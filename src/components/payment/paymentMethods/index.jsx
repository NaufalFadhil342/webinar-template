import Icon from "@mdi/react";
import { mdiLock } from '@mdi/js';
import CreditDebitCard from "./creditDebitCard";
import Paypal from "./paypal";
import PropTypes from 'prop-types';
import BankTransfer from "./bankTransfer";

const PaymentMethod = ({ calculateTotals, paymentMethod, handlePaymentMethod, errors }) => {
    return (
        <section className="w-full h-auto flex flex-col gap-8 bg-white rounded-xl p-6">
            <div className="w-full flex items-center justify-between">
                <h3 className="font-semibold text-xl text-zinc-900 leading-none">Payment Methods</h3>
                <p className="flex justify-end items-center text-sm gap-1">
                    <>Encrypt and Secure</>
                    <Icon className="text-zinc-600" path={mdiLock} size={0.75} />
                </p>
            </div>
            <div className="w-full h-auto flex flex-col gap-5">
                <div className="flex items-center gap-2 border border-zinc-400 p-3 rounded-md">
                    <input type="radio" className="size-4" checked={paymentMethod.selectedPayment === 'debit card'} name='selectedPayment' value='debit card' onChange={handlePaymentMethod} />
                    <label className="text-zinc-600">Credit / Debit Card</label>
                </div>
                {paymentMethod.selectedPayment === 'debit card' && <CreditDebitCard paymentMethod={paymentMethod} handlePaymentMethod={handlePaymentMethod} errors={errors} />}
                <div className="flex items-center gap-2 border border-zinc-400 p-3 rounded-md">
                    <input type="radio" className="size-4" checked={paymentMethod.selectedPayment === 'paypal'} name='selectedPayment' value='paypal' onChange={handlePaymentMethod} />
                    <label className="text-zinc-600">Paypal</label>
                </div>
                {paymentMethod.selectedPayment === 'paypal' && <Paypal totalCash={calculateTotals} />}
                <div className="flex items-center gap-2 border border-zinc-400 p-3 rounded-md">
                    <input type="radio" className="size-4" checked={paymentMethod.selectedPayment === 'bank transfer'} name='selectedPayment' value='bank transfer' onChange={handlePaymentMethod} />
                    <label className="text-zinc-600">Bank Transfer</label>
                </div>
                {paymentMethod.selectedPayment === 'bank transfer' && <BankTransfer paymentMethod={paymentMethod} handlePaymentMethod={handlePaymentMethod} errors={errors} />}
            </div>
        </section>
    )
};

PaymentMethod.propTypes = {
    calculateTotals: PropTypes.func,
    paymentMethod: PropTypes.object.isRequired,
    handlePaymentMethod: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default PaymentMethod;