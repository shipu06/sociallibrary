import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeSaved, setSaved } from "../store/actions/savedActions";
import { removeDeleted, setDeleted } from "../store/actions/deletedActions";
import { updateFiltered } from "../store/actions/filteredActions";

import storage from "../utils/storage";

export default function Flats() {
  const dispatch = useDispatch();

  // Removed & Saved listings
  const deleted = useSelector((state) => state.deleted);
  const saved = useSelector((state) => state.saved);

  return (
    <div className="height-screen-without-logo">
      <h4 class="text-xl font-bold text-gray-700 dark:text-gray-600 text-center mt-6">
        Summary
      </h4>
      <section class="py-1">
        <div class="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-gray-700">
                    {saved.length > 0
                      ? saved.length + " saved listings"
                      : "0 saved listings"}
                  </h3>
                </div>

                {saved.length > 0 && (
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
              <div class="block w-full overflow-x-auto pb-4">
                <table class="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Id
                      </th>
                      <th class="bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                      <th class="pl-3 pr-16 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-20">
                        Image
                      </th>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Info
                      </th>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Listing name
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {saved.map((listing, idx) => {
                      return (
                        <tr>
                          <th class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-left text-gray-500 font-thin">
                            {idx + 1}
                          </th>
                          <td class="border-t-0  align-left border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                            <button
                              class="px-2 text-indigo-500 text-xs font-bold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                dispatch(removeSaved(listing));
                                dispatch(updateFiltered());
                              }}
                            >
                              <svg
                                class="w-6 h-6"
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
                          <th class="border-t-0 px-3 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-gray-700 ">
                            <a href={listing.link} target="_blank">
                              <img
                                src={listing.mainImage}
                                className="object-cover md:w-full md:h-24 h-24 w-full"
                              />
                            </a>
                          </th>
                          <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 ">
                            <h1 className="text-lg font-bold">
                              {listing.price}
                            </h1>
                            {listing.area + "  -   " + listing.rooms}
                          </td>
                          <th class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs font-thin py-3 text-left font-normal text-gray-700">
                            <a href={listing.link} target="_blank">
                              {listing.title}
                            </a>
                          </th>
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
      <section class="py-1">
        <div class="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-gray-700">
                    {deleted.length > 0
                      ? deleted.length + " removed listings"
                      : "0 removed listings"}
                  </h3>
                </div>

                {deleted.length > 0 && (
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      class="bg-red-400 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
              <div class="block w-full overflow-x-auto pb-4">
                <table class="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Id
                      </th>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                      <th class="px-3 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        URL
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {deleted.map((url, idx) => {
                      return (
                        <tr>
                          <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-1 text-left text-gray-500 font-thin">
                            {idx + 1}
                          </td>
                          <td class="border-t-0 px-3 align-left border-l-0 border-r-0 text-xs whitespace-nowrap py-1">
                            <button
                              class="p-2 text-red-400 text-xs font-semibold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                dispatch(removeDeleted(url));
                                dispatch(updateFiltered());
                              }}
                            >
                              delete
                            </button>
                          </td>
                          <td class="border-t-0 px-3 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-gray-700 ">
                            <a href={url} target="_blank" />
                            {url}
                            <a />
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
