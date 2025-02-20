import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="flex flex-col px-10 md:flex-row flex-wrap bg-[#5f6FFF] rounded-lg md:px-10 lg:px-20">
        {/* leftside */}
        <div className="md:w-1/2 flex-col items-center justify-center py-10 m-auto md:py-[10vw] md:mb-[-30px] ">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight mb-4">
                Book Appointment <br/> With Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mb-4">
                <img className="w-28" src={assets.group_profiles} alt="gp" />
                <p>Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block"/>schedule your appointment hassle-free.</p>
            </div>
            <a className="flex w-55 items-center gap-4 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300" href="#speciality">
                Book Appointment <img className="w-4" src={assets.arrow_icon} alt="ai" />
            </a>
        </div>

        {/* rigthside */}
        <div className="md:w-1/2 relative">
            <img className="w-full md:absolute bottom-0 h-auto rounded-lg " src={assets.header_img} alt="hi" />
        </div>
    </div>
  )
}

export default Header