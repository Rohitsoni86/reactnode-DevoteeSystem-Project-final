import { Link } from "react-router-dom";
export default function UpdateConfirmation() {
  return (
    <>
      <div className="modalContainer">
        <div className="fixed inset-0 h-screen w-screen z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto">
          <div className="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-40 opacity-100">
            <div className="relative bg-white shadow-lg rounded-lg text-gray-900 z-20">
              <header className="flex flex-col justify-center items-center p-3 text-green-600">
                <div className="flex justify-center w-28 h-28 border-4 border-green-600 rounded-full mb-4">
                  <svg className="fill-current w-20" viewBox="0 0 20 20">
                    <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                  </svg>
                </div>
                <h2 className="font-semibold text-2xl">Success</h2>
              </header>
              <main className="p-3 text-center">
                <p className="text-xl font-bold">
                  User Successfully Updated To Database !!
                </p>
              </main>
              <footer className="flex justify-center bg-transparent">
                <Link
                  to="/adminhome/home"
                  className="bg-green-600 text-center font-semibold text-white py-3 w-full rounded-b-md hover:bg-green-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
                >
                  Go To Dashboard
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
