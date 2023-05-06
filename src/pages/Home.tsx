import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineSaveAs } from "react-icons/hi";
import { GiSwordsEmblem } from "react-icons/gi";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/quizanimation.json";

function Home() {
  return (
    <div>
      <h1 className="text-center">The Daily Programming Quiz</h1>

      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "400px" }}
      />

      <div className="flex">
        <div>
          <div className="flex flex-colum items-center gap-3">
            <FaRegCommentDots />
            <p className="text-xs">Leave a Comment</p>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineSaveAs />
            <p className="text-xs">Save Quiz</p>
          </div>
          <div className="flex items-center gap-3">
            <GiSwordsEmblem />
            <p className="text-xs">Challenge a Friend</p>
          </div>
        </div>
        <div></div>
      </div>
      <Link to={"/quiz"} className="flex justify-center">
        <button className="px-5 bg-[#ba2aee] rounded-xl text-white">
          Take Quiz
        </button>
      </Link>
    </div>
  );
}

export default Home;
