import { dummyMemberPricelist as memberLists } from "../../data/mmberPriceListData";
import PriceListItems from "./priceListItems";
import PropTypes from 'prop-types';

const PriceList = ({ dark }) => {
    return (
        <section className='w-full h-auto flex flex-col gap-10 px-[8%] py-24'>
            <div className="w-auto h-auto flex flex-col items-center gap-2">
                <h1 className={`text-center text-4xl font-semibold uppercase ${dark ? 'text-white' : 'text-zinc-900'}`}>Get Your Member</h1>
                <p className={`${dark ? 'text-zinc-300' : 'text-zinc-600'} text-center w-3/5`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At omnis quidem dignissimos tempora maiores dolorum.</p>
            </div>
            <div className="w-full h-auto mt-4 grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-8">
                <PriceListItems
                    memberLists={memberLists[0]}
                    backgroundColor={dark ? 'bg-zinc-800/50' : 'bg-white'}
                    priceColor={dark ? 'text-secondary' : 'text-primary'}
                    headerColor={dark ? 'text-white' : 'text-zinc-900'}
                    textColor={dark ? 'text-zinc-300' : 'text-zinc-600'}
                    hasBorder={false}
                    buttonColor={dark ? 'bg-secondary' : 'bg-primary'}
                    buttonHoverColor={dark ? 'bg-darkSecondary' : 'bg-darkPrimary'}
                    buttonTextColor='text-white'
                    dark={dark}
                />
                <PriceListItems
                    memberLists={memberLists[1]}
                    backgroundColor={dark ? 'bg-secondary' : 'bg-primary'}
                    priceColor='text-white'
                    headerColor='text-white'
                    textColor='text-zinc-300'
                    hasBorder={false}
                    buttonColor='bg-white'
                    buttonHoverColor='bg-zinc-200'
                    buttonTextcolor='text-zinc-600'
                    dark={dark}
                />
                <PriceListItems
                    memberLists={memberLists[2]}
                    backgroundColor={dark ? 'bg-zinc-800/50' : 'bg-white'}
                    priceColor={dark ? 'text-secondary' : 'text-primary'}
                    headerColor={dark ? 'text-white' : 'text-zinc-900'}
                    textColor={dark ? 'text-zinc-300' : 'text-zinc-600'}
                    hasBorder={true}
                    borderColor={dark ? 'border-secondary' : 'border-primary'}
                    buttonColor={dark ? 'bg-secondary' : 'bg-primary'}
                    buttonHoverColor={dark ? 'bg-darkSecondary' : 'bg-darkPrimary'}
                    buttonTextColor='text-white'
                    dark={dark}
                />
            </div>
        </section>
    )
};

PriceList.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default PriceList;