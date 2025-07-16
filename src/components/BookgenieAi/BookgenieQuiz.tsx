import img from "../../assets/book.png";

export default function BookgenieQuiz() {
  return (
    <div className="md:ml-72 md:mt-8 mt-28  ml-0 md:max-w-4xl flex items-center justify-center bg-white">
      <img
        src={img}
        alt="book"
        className="max-h-[36rem] mx-auto"
      />
    </div>
  );
}
