import CheckIcon from '@mui/icons-material/Check';
import { ButtonLink } from './ButtonLink';

export const Hero = () => {
  return (
    
    <div className="flex flex-col xl:flex-row items-start justify-between my-64">
        <div className="flex flex-col gap-6 w-6/12">
            <h2 className="text-[56px]/16">Stay organized and Boost Productivity with <span className="text-bold text-orange-500">DOIT</span></h2>
            <p className="text-lg">Looking for a simple, effective way to manage your tasks and take control of your time? To Do is your ultimate productivity companion — whether you're planning your day, managing a project, or tracking long-term goals.</p>
            <ButtonLink to={"/creator"}>Try it now!</ButtonLink>
        </div>
        <div className="flex flex-col items-center justify-center w-6/12">
          <h3 className="text-4xl mb-10">Why you should choose us?</h3>
          <div className='flex flex-col gap-4 text-xl'>
            <p className='flex items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Easy to use</b> - Clean, intuitive interface that gets you started in seconds</p>
            <p className='flex items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Reminders & Deadlines</b> - Never miss an important date again</p>
            <p className='flex items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Custom Categories and Tags</b> - Personalize your workflow</p>
            <p className='flex items-center gap-2 whitespace-nowrap'><CheckIcon color='warning'/><b>Dark Mode Available</b> - Stay focused, day or night</p>
          </div>
        </div>
    </div>
  )
}
