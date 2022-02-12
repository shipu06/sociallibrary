import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeSaved, setSaved } from "../store/actions/savedActions";
import { removeDeleted, setDeleted } from "../store/actions/deletedActions";
import { updateFiltered } from "../store/actions/filteredActions";

export default function Flats() {
  const dispatch = useDispatch();

  // Removed & Saved listings
  const deleted = useSelector((state) => state.deleted);
  const saved = useSelector((state) => state.saved);

  return (
    <div className="height-screen-without-logo">
      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-600 text-center mt-6">
        Summary
      </h4>
      <section className="py-1">
        <div className="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-700">
                    {saved.length > 0
                      ? saved.length + " saved listings"
                      : "0 saved listings"}
                  </h3>
                </div>

                {saved.length > 0 && (
                  <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        dispatch(setSaved([]));
                        dispatch(updateFiltered());
                      }}
                    >
                      Remove all
                    </button>
                  </div>
                )}
              </div>
            </div>

            {saved.length > 0 && (
              <div className="block w-full overflow-x-auto pb-4">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Id
                      </th>
                      <th className="bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                      <th className="pl-3 pr-16 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-20 md:pr-72">
                        Image
                      </th>
                      <th className="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Info
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {saved.map((listing, idx) => {
                      return (
                        <tr>
                          <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-left text-gray-500 font-thin">
                            {idx + 1}
                          </th>
                          <td className="border-t-0  align-left border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                            <button
                              className="px-2 text-indigo-500 text-xs font-bold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                dispatch(removeSaved(listing));
                                dispatch(updateFiltered());
                              }}
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="1"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </td>
                          <th className="border-t-0 px-3 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-normal text-left text-gray-700 ">
                            <a href={listing.link} target="_blank">
                              <img
                                src={listing.mainImage}
                                className="object-cover md:w-full md:h-44 h-24 w-full"
                              />
                            </a>
                          </th>
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs  py-3 ">
                            <a
                              href={listing.link}
                              target="_blank"
                              className="block font-medium"
                            >
                              {listing.title}
                            </a>
                            <h1 className="text-lg font-bold py-2">
                              {listing.price}
                            </h1>
                            <span className="text-gray-500 text-xs">
                              {listing.area + "  -   " + listing.rooms}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-1">
        <div className="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-700">
                    {deleted.length > 0
                      ? deleted.length + " removed listings"
                      : "0 removed listings"}
                  </h3>
                </div>

                {deleted.length > 0 && (
                  <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-red-400 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        dispatch(setDeleted([]));
                        dispatch(updateFiltered());
                      }}
                    >
                      Remove all
                    </button>
                  </div>
                )}
              </div>
            </div>

            {deleted.length > 0 && (
              <div className="block w-full overflow-x-auto pb-4">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Id
                      </th>
                      <th className="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        URL
                      </th>
                      <th className="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {deleted.map((url, idx) => {
                      return (
                        <tr>
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-1 text-left text-gray-500 font-thin">
                            {idx + 1}
                          </td>
                          <td className="border-t-0 px-3 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-gray-700 ">
                            <a href={url} target="_blank" />
                            {url}
                            <a />
                          </td>
                          <td className="border-t-0 px-3 align-left border-l-0 border-r-0 text-xs whitespace-nowrap py-1">
                            <button
                              className="p-2 text-red-400 text-xs font-semibold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                dispatch(removeDeleted(url));
                                dispatch(updateFiltered());
                              }}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
