import Header from "../../components/header";
import { PAYMENT_HEADER as header } from "../../config/configData";
import Payment from "../../components/payment";
import ToTop from "../../UI/toTop";
import PropTypes from 'prop-types';

const PaymentGateway = ({ dark }) => {
    return (
        <main className='w-full h-auto flex flex-col gap-10'>
            <Header
                ariaLabel='payment gateway header'
                dark={dark}
                title={header.title}
                tagline='payment'
            />
            <section className='pb-24' aria-labelledby='payment gateway content'>
                <div id='payment gateway content'>
                    <Payment dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};

PaymentGateway.propTypes = {
    dark: PropTypes.bool
};

export default PaymentGateway;
