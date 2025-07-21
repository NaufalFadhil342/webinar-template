import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from '@mdi/js';
import PropTypes from 'prop-types';

const PriceListItems = ({ memberLists, backgroundColor, priceColor, textColor, headerColor, hasBorder, borderColor, buttonColor, buttonTextColor, buttonHoverColor }) => {
    return (
        <div className={`${backgroundColor} ${hasBorder === true ? `border ${borderColor}` : 'border-none'} w-full sm:w-3/5 lg:w-full h-auto flex flex-col gap-2 items-center p-6 rounded-xl`}>
            <h1 className={`${priceColor} font-bold text-5xl leading-none`}>${memberLists.price}</h1>
            <div className={`${headerColor} font-semibold text-lg`}>{memberLists.memberType}</div>
            <div className="w-1/2 h-[1.5px] bg-zinc-300/50" />
            <ul className="w-full h-auto mt-6 flex flex-col items-center">
                {memberLists.features.map((feature, index) => (
                    <div key={index} className='w-full h-auto'>
                        <div className="w-full h-auto flex flex-col items-center gap-2">
                            {feature.unlock.map((value, index) => (
                                <li key={index} className={`w-fit h-auto flex items-start gap-2 ${textColor} text-[15px]`}>
                                    <Icon path={mdiCheck} size={1} className="text-green-400" />
                                    <>{value}</>
                                </li>
                            ))
                            }
                        </div>
                        <div className="w-full h-auto mt-4 flex flex-col items-center gap-2">
                            {feature.locked.map((value, index) => (
                                <li key={index} className={`w-fit h-auto flex items-start gap-2 ${textColor} text-[15px]`}>
                                    <Icon path={mdiClose} size={1} className="text-red-500" />
                                    <>{value}</>
                                </li>
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
            <div className="w-full h-auto flex justify-center mt-2">
                <button className={`py-2 px-4 rounded-md ${buttonColor} ${buttonTextColor} hover:${buttonHoverColor} transition-all duration-150 ease-in-out`}>Start Member</button>
            </div>
        </div>
    )
};

PriceListItems.propTypes = {
    memberLists: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string,
    priceColor: PropTypes.string,
    textColor: PropTypes.string,
    headerColor: PropTypes.string,
    hasBorder: PropTypes.bool.isRequired,
    borderColor: PropTypes.string,
    buttonColor: PropTypes.string,
    buttonTextColor: PropTypes.string,
    buttonHoverColor: PropTypes.string
}

export default PriceListItems;