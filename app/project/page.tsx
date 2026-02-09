"use client"

import { useState } from "react"

export default function ProjectPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <h1 className="text-3xl font-bold">Project</h1>

      <p className="text-gray-700">Hier onder vind u drie van mijn projecten.</p>

      <ul className="list-disc pl-5 text-gray-700 space-y-6">
        <li>
          <h3 className="font-semibold">Leporello</h3>
          <div className="mt-3">
            <img
              src="/leporello-1.png"
              alt="Leporello preview"
              className="w-full max-w-sm rounded shadow cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </li>
      </ul>

      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus harum, tenetur repellat numquam perferendis magnam, incidunt dolorem fugiat eum consequuntur architecto beatae quidem accusamus, porro nemo facilis error aperiam inventore!
      </p>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-800/60"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-gray-100 rounded-lg p-4 max-w-3xl mx-4 z-10">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="mt-2">
              <img
                src="/leporello-1.png"
                alt="Leporello large preview"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
