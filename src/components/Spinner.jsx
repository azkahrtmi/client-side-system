import Raja from "/raja.png";
function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center content-center h-screen">
      <img
        src={Raja}
        alt=""
        className="w-70 h-100  animate-spin"
      />
    </div>
  );
}

export default Spinner;
