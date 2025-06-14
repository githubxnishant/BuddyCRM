import { motion } from 'framer-motion'
const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ wordSpacing: '-1px' }}
            className='w-full h-16 text-sm flex justify-center items-center fixed bottom-0 z-20 bg-white'>
            "Crafted with ❤️ by
            <span className='pl-1 cursor-pointer font-medium'>
                <a href='https://linktr.ee/nishant.chauhan' target='_blank'>Nishant</a>
            </span>
            "
        </motion.div>
    )
}

export default Footer