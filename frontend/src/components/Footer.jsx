import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid md:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* left section */}
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className="text-gray-600 w-full md:w-3/4 leading-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa cupiditate cumque ipsum nam eos doloribus in, exercitationem ratione. Earum magni odit incidunt laboriosam soluta nisi, perferendis enim repellendus quisquam eum.</p>
            </div>

            {/* center section */}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            
            {/* right section */}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>+1-212-456-7890</li>
                    <li>max191267@gmail.com</li>
                </ul>
            </div>
        </div>
        
        {/* copyright text */}
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ AppointMed - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer