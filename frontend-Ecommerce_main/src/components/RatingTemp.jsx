import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const RatingTemp = ({rating}) => {
  if (rating === 5) {
    return (
      <>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
      </>
    )
  }

  else if (rating === 4) {
    return (
      <>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
      </>
    )
  }
  else if (rating === 3) {
    return (
      <>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
      </>
    )
  }
  else if (rating === 2) {
    return (
      <>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
      </>
    )
  }
  else if (rating === 1) {
    return (
      <>
       <span className="text-[#Edbb0E]"><FaStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
      </>
    )
  }
  else {
    return (
      <>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
       <span className="text-[#Edbb0E]"><CiStar/></span>
      </>
    )
  }
 
}

export default RatingTemp