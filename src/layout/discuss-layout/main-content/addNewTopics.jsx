import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../UI/form';
import { motion } from 'motion/react';
import { useTopics } from '../../../hooks/useTopics';

const AddNewTopics = ({ dark }) => {
    const { addTopic } = useTopics();
    const [addTopics, setAddTopics] = useState('');
    const [showNewTopic, setShowNewTopic] = useState(false);

    const handleAddTopics = (e) => setAddTopics(e.target.value);

    const showForm = () => {
        setShowNewTopic(true);
    };

    const hideForm = () => {
        setShowNewTopic(false);
    };

    const handleAddNewTopic = (e) => {
        e.preventDefault();

        if (addTopics && addTopics.trim()) {
            const formData = {
                text: addTopics.trim()
            };

            addTopic(formData);
            console.log("adding new topic", formData);

            setAddTopics('');
            hideForm();
        } else {
            console.error("Topic text cannot be empty")
        }
    };

    return (
        <section className='w-full h-auto flex flex-col gap-8'>
            <div className='w-full flex items-centeg gap-10 justify-between'>
                <h1 className={`text-[2em] font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>Recent Topics</h1>
                <button type='button' onClick={showForm} className={`w-fit h-10 flex items-center px-4 rounded ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white transition-all duration-150`}>+ New Topics</button>
            </div>
            <motion.div
                className='w-full h-auto none opacity-0'
                initial={{ opacity: 0, display: 'none' }}
                animate={showNewTopic ?
                    { opacity: 1, display: 'block' } :
                    { opacity: 0, display: 'none' }}
                transition={{ duration: 0.5 }}
            >
                <Form className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} p-6 rounded-lg shadow-md`} method='POST' submitForm={handleAddNewTopic}>
                    <textarea
                        className={`${dark ? "border-zinc-200 bg-zinc-700/60 text-zinc-200" : "bg-zinc-200/50  text-zinc-600"} w-full h-28 bg-transparent rounded-md p-2 border-b-2 outline-none`}
                        placeholder='Type your topic'
                        value={addTopics}
                        onChange={handleAddTopics}
                    />
                    <div className='w-full h-auto flex items-center gap-4 mt-4'>
                        <button
                            type='submit'
                            className={`${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"} w-fit h-10 flex items-center rounded-md px-4  text-white transition-all duration-150`}
                        >
                            Post
                        </button>
                        <button
                            type='button'
                            className={`${dark ? "bg-secondary/20 hover:bg-secondary/100 text-white" : "bg-primary/20 hover:bg-primary/100 text-primary hover:text-white"} w-fit h-10 flex items-center rounded-md px-4 transition-all duration-150`}
                            onClick={hideForm}
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            </motion.div>
        </section>
    );
};

AddNewTopics.propTypes = {
    dark: PropTypes.bool
}

export default AddNewTopics;