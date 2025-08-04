import React, { useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { Sparkles, Search, X } from "lucide-react";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    inputRef.current.value = "";
    setInput("");
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="bg-indigo-100 py-2.5 px-6 mb-4 inline-flex items-center gap-4 border text-sm text-primary rounded-full justify-center border-primary/40">
          <p>ಸೂಚನೆ: ಹೊಸ AI ಆಧಾರಿತ ವೈಶಿಷ್ಟ್ಯಗಳು ಸೇರಿಸಲಾಗಿದೆ</p>
          <Sparkles className="w-4 h-4 text-indigo-600" />
        </div>
        <h1 className="text-gray-700 text-3xl sm:text-6xl sm:leading-[60px] font-semibold">
          ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ <span className="text-primary">ಹುಲಿಕಟ್ಟಿ</span>
        </h1>
        <p className="text-gray-500 my-6 sm:my-8 m-auto max-sm:text-xs text-sm">
          ನಮ್ಮ ಶಾಲೆಯ ವಿದ್ಯಾ ಪ್ರಗತಿಗೆ ಸ್ಫೂರ್ತಿ ನೀಡುವ ಕೇಂದ್ರ.
          <br />
          ವಿದ್ಯಾರ್ಥಿಗಳ ಸಾಧನೆಗಳು, ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಇತಿಹಾಸ ಇಲ್ಲಿದೆ.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex mx-auto border-gray-300 bg-white justify-between max-sm:scale-75 border max-w-lg rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="ಹುಡುಕಿ ನೋಡಿ (ಹೆಸರು/ವರ್ಷ)"
          />
          <button className="bg-primary px-8 py-2 m-1.5 rounded-md hover:scale-105 transition-none cursor-pointer text-[#8A0000] border border-[#8A0000] rounded-lg flex items-center gap-2">
            <Search className="w-4 h-4" /> ಹುಡುಕು
          </button>
        </form>
      </div>

      {input && (
        <div className="flex justify-center items-center text-center mt-4">
          <button
            className="border border-black px-4 py-1 rounded cursor-pointer w-40 mx-auto flex items-center justify-center gap-2"
            onClick={onClear}
          >
            <X className="w-4 h-4" /> ಕ್ಲಿಯರ್ ಮಾಡಿ
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
