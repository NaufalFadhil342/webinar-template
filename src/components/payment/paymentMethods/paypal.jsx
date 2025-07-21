/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';

const Paypal = ({ totalCash }) => {

    return (
        <section className="w-full h-auto flex flex-col gap-5 px-4">
            <p className="text-zinc-600">In order to complete your transaction, you will be redirected to PayPal's sucure server.</p>
            <div className="font-medium text-zinc-900 flex gap-1">PayPal will charge you a fee of <p className="text-primary">${totalCash()}</p>.</div>
        </section>
    )
};

Paypal.propTypes = {
    totalCash: PropTypes.func,
}

export default Paypal;