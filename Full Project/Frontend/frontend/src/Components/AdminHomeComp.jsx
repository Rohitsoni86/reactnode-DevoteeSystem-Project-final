// import { useEffect } from "react";
import TableRow from "./AdminHomeInnerComp/TableRow";

export default function AdminHomeComp() {
  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <>
      <div className="bg-slate-400 min-h-screen flex flex-col py-24">
        <div className="container   mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="mx-auto  w-full py-8 sm:px-8">
            <div className="flex  items-center justify-between pb-6">
              <div>
                <h2 className="font-semibold text-black-700">User Accounts</h2>
                <span className="text-xs text-black-500">
                  All Devotees Accounts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="ml-10 space-x-8 lg:ml-40">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
                  >
                    Referesh List
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-y-hidden shadow-black shadow-md rounded-lg border">
              <div className="overflow-x-auto ">
                <table className="w-full ">
                  <thead>
                    <tr className="bg-blue-600 text-lg text-center font-medium uppercase tracking-widest text-white">
                      <th className="px-5 py-3">ID</th>
                      <th className="px-5 py-3">Full Name</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Created at</th>
                      <th className="px-5 py-3">Address</th>
                      <th className="px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    <TableRow />
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                {/* <span className="text-xs text-gray-600 sm:text-sm">
                  {" "}
                  Showing 1 of 12 Entries{" "}
                </span> */}
                {/* <div className="mt-2 inline-flex sm:mt-0">
                  <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Prev
                  </button>
                  <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Next
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
