import { motion } from 'framer-motion'
const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ wordSpacing: '-1px' }}
            className='w-full h-12 text-sm flex justify-center items-center bg-white'>
            "Crafted with ❤️ by
            <span className='pl-1 cursor-pointer font-medium'>
                <a href='https://linktr.ee/nishant.chauhan' target='_blank'>Nishant</a>
            </span>
            "
        </motion.div>
    )
}

export default Footer