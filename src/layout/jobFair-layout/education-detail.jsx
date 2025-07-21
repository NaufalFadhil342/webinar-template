import PropTypes from 'prop-types';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';

const department = [
    {
        field: 'Natural Sciences',
        study: 'Physics, Mathematics, Astronomy, etc'
    },
    {
        field: 'Engineering & Technology',
        study: 'Computer Science, Software Engineering, Information Technology, etc'
    },
    {
        field: 'Medical & Health Sciences',
        study: 'Medicine, Nursing, Pharmacy, etc'
    },
    {
        field: 'Social Sciences',
        study: 'Psychology, Sociology, Economics, etc'
    },
    {
        field: 'Business & Management',
        study: 'Accounting & Finance, Marketing, Entrepreneurship, etc'
    },
    {
        field: 'Humanity & Arts',
        study: 'Music, History, Fint Arts, etc'
    },
    {
        field: 'Law & Legal Studies',
        study: 'Law, Criminology, Internaional Law'
    },
    {
        field: 'Education',
        study: 'Educational Psychology, Curriculum Development, Special Education'
    },
    {
        field: 'Agriculture & Environmental Studies',
        study: 'Agricultural Science, Forestry, Environmental Management'
    }
];

const EducationDetail = ({
    dark,
    education,
    index,
    handleEducation,
    showRemoveButton,
    onRemove,
    errors
}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleEducation(index, name, value);
    };

    return (
        <div className="w-full h-auto flex flex-col gap-6 relative">
            {showRemoveButton && (
                <button
                    className='absolute top-0 right-0 text-red-500 hover:text-red-700'
                    type='button'
                    onClick={onRemove}
                >
                    <Icon path={mdiDelete} size={1} />
                </button>
            )}
            <section className='w-full h-auto flex items-center gap-6'>
                <div className='w-full h-auto'>
                    <label htmlFor={`instituteName-${index}`} className={`after:content-['*'] after:ml-2 after:text-red-500 ${dark ? 'font-medium text-white' : "font-medium text-zinc-900"}`}>Name of Institute</label>
                    <input
                        type="text"
                        id={`instituteName-${index}`}
                        className={`w-full h-12 flex px-2 bg-transparent mt-2 outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                        name='instituteName'
                        value={education.instituteName || ''}
                        onChange={handleChange}
                    />
                    {errors && errors[`education[${index}].instituteName`] &&
                        <p className='text-red-500'>{errors[`education[${index}].instituteName`]}</p>}
                </div>
                <div className='w-full h-auto'>
                    <label htmlFor={`degree-${index}`} className={dark ? 'font-medium text-white' : "font-medium text-zinc-900"}>Degree/Certificate</label>
                    <input
                        type="text"
                        id={`degree-${index}`}
                        placeholder='e.g. Highschool, S1, S2, etc'
                        className={`w-full h-12 flex px-2 bg-transparent mt-2 outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                        name='degree'
                        value={education.degree || ''}
                        onChange={handleChange}
                    />
                </div>
            </section>
            <section className='w-full h-auto flex items-center gap-6'>
                <div className='w-full h-auto'>
                    <label htmlFor={`studyFields-${index}`} className={dark ? 'font-medium text-white' : "font-medium text-zinc-900"}>Field of Study</label>
                    <select
                        name="studyFields"
                        id={`studyFields-${index}`}
                        className={`w-full h-12 inline-block px-2 bg-transparent mt-2 outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                        value={education.studyFields || ''}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select field</option>
                        {department.map((study, index) => (
                            <option
                                key={index}
                                value={study.field}
                                className={dark ? "bg-zinc-800 text-zinc-300" : "bg-white text-zinc-600"}
                            >
                                {study.field} (Ex. {study.study})
                            </option>
                        ))}
                    </select>
                </div>
                <div className='w-full h-auto'>
                    <label htmlFor={`gradDate-${index}`} className={`after:content-['*'] after:ml-2 after:text-red-500 ${dark ? 'font-medium text-white' : "font-medium text-zinc-900"}`}>Graduation Date</label>
                    <input
                        type="month"
                        id={`gradDate-${index}`}
                        className={`w-full h-12 inline-block px-2 bg-transparent mt-2 outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                        name='gradDate'
                        value={education.gradDate || ''}
                        onChange={handleChange}
                    />
                    {errors && errors[`education[${index}].gradDate`] &&
                        <p className='text-red-500'>{errors[`education[${index}].gradDate`]}</p>}
                </div>
            </section>
            <section className='w-full h-auto'>
                <label htmlFor={`achieve-${index}`} className={dark ? 'font-medium text-white' : "font-medium text-zinc-900"}>Achievements (Optional)</label>
                <textarea
                    name="achieve"
                    id={`achieve-${index}`}
                    className={`w-full h-32 p-2 bg-transparent mt-2 outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    value={education.achieve || ''}
                    onChange={handleChange}
                />
            </section>
        </div>
    )
};

EducationDetail.propTypes = {
    dark: PropTypes.bool,
    education: PropTypes.object.isRequired,
    handleEducation: PropTypes.func.isRequired,
    index: PropTypes.any,
    showRemoveButton: PropTypes.bool,
    onRemove: PropTypes.any,
    errors: PropTypes.object
}

export default EducationDetail;