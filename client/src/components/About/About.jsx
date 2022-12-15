import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function About(){
    return(
        <div className="w-full p-2 md:flex items-center justify-center">
            <div className="bg-gray-800 p-2 md:w-1/2 lg:w-1/3">
                <div className="bg-gray-500 mb-2 text-center font-bold text-3xl text-gray-900 rounded-xl">
                    <h2>About me</h2>
                </div>
                <div className="bg-gray-500 mb-2 text-center p-5 rounded-xl">
                <div className="md:text-3xl text-2xl">
                            <a href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                                <FaLinkedin/>
                                <span className="font-bold">Linkedin</span>
                            </a>
                        </div>
                        <div className="md:text-3xl text-2xl">
                            <a href="https://github.com/FrankSmith685" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                                <FaGithub/>
                                <span className="font-bold">Github</span>
                            </a>
                        </div>
                </div>


            </div>
        </div>
    )
}