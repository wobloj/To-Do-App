import CheckIcon from '@mui/icons-material/Check';
import { ButtonLink } from './ButtonLink';

export const Hero = () => {
  return (
    
    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-16 justify-between my-16 xl:my-64">
        <div className="flex flex-col gap-6 w-10/12 xl:w-6/12">
            <h2 className="text-center xl:text-left font-bold text-3xl sm:text-[56px]/16">Stay organized and Boost Productivity with <span className="text-bold text-orange-500">DOIT</span></h2>
            <p className="text-center text-lg xl:text-xl">Looking for a simple, effective way to manage your tasks and take control of your time? To Do is your ultimate productivity companion — whether you're planning your day, managing a project, or tracking long-term goals.</p>
            <ButtonLink to={"/creator"}>Try it now!</ButtonLink>
        </div>
        <div className="flex flex-col items-center justify-center w-10/12 xl:w-6/12">
          <h3 className="text-center font-bold text-2xl sm:text-4xl mb-10">Why you should choose us?</h3>
          <div className='flex flex-col gap-4 text-sm sm:text-lg xl:text-xl'>
            <p className='flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Easy to use</b> <span className='hidden sm:block'>-</span> Clean, intuitive interface that gets you started in seconds</p>
            <p className='flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Reminders & Deadlines</b> <span className='hidden sm:block'>-</span> Never miss an important date again</p>
            <p className='flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Custom Categories and Tags</b> <span className='hidden sm:block'>-</span> Personalize your workflow</p>
            <p className='flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Dark Mode Available</b> <span className='hidden sm:block'>-</span> Stay focused, day or night</p>
          </div>
        </div>
    </div>
  )
}
