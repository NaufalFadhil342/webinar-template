import Icon from '@mdi/react';
import { mdiCircleSmall } from '@mdi/js';
import PropTypes from 'prop-types';

const OrderDetails = ({ selectedSessions, calculatePrices }) => {

    return (
        <section className='w-full h-auto p-6 bg-white rounded-xl flex flex-col gap-8'>
            <h3 className="text-zinc-900 font-semibold text-xl flex items-center gap-1 leading-none">
                <>Order Details</>
                <div className="font-normal text-zinc-600 text-base">( {selectedSessions?.length} {selectedSessions?.length === 1 ? 'Session' : 'Sessions'} )</div>
            </h3>
            <div className="w-full h-auto flex flex-col gap-5">
                <div className="flex items-center gap-1 justify-between">
                    <p className="text-zinc-900 font-medium">Session names</p>
                    <div className="text-zinc-600">${calculatePrices()}</div>
                </div>
                <div className='flex flex-col gap-2'>
                    {selectedSessions?.map((session) => (
                        <div key={session?.id} className='text-sm text-zinc-600 flex items-center'>
                            <Icon path={mdiCircleSmall} size={0.8} />
                            <>{session?.title}</>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

OrderDetails.propTypes = {
    selectedSessions: PropTypes.array,
    calculatePrices: PropTypes.func
}

export default OrderDetails;