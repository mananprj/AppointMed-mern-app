import { assets } from "../assets/assets"

const About = () => {
  return (
    <div>
        <div className="text-center text-2xl pt-10 text-gray-500">
          <p>ABOUT <span className="text-gray-700 font-medium">US</span></p>
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img className="w-full max-w-[360px]" src={assets.about_image} alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-3/5 text-sm text-gray-600">
            <p>Welcome to AppointMed, your trusted partner in managing your healthcare needs conveniently and efficiently. At AppointMed, we understood the challenges indivisuals face when it comes to scheduling doctor appointments and managing their healths records.</p>
            <p>AppointMed is commited to excellence in healthcare technology. We continuosly strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you`re bookingyour firsrt appointment or managing ongoing care. AppointMed is here to support you every step of the way.</p>
            <b className="text-gray-700 text-lg">Our Vision</b>
            <p>Our vision AppointMed is to create a seamless healthcare experince for every user. We aim to bridge the gap between patients and healthcare providers. making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>

        <div className="text-xl my-10 text-gray-500">
          <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row mb-30">
          <div className="shadow shadow-gray-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-105">
            <b>Efficiency:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="shadow shadow-gray-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-105">
            <b>Convenience:</b>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="shadow shadow-gray-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-105">
            <b>Personalization:</b>
            <p>Tailored recommedations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
    </div>
  ) 
}

export default About