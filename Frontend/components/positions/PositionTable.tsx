"use client";

import { motion } from "framer-motion";
import { Position } from "@/types/positon";

interface Props {
  positions: Position[];
  onSelect: (position: Position) => void;
}

export default function PositionTable({
  positions,
  onSelect,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-md">
      <table className="w-full min-w-[1200px]">
        <thead>
          <tr className="border-b border-border text-left text-sm text-muted">
            <th className="px-6 py-5 font-medium">Position</th>
            <th className="px-6 py-5 font-medium">Department</th>
            <th className="px-6 py-5 font-medium">Location</th>
            <th className="px-6 py-5 font-medium">Experience</th>
            <th className="px-6 py-5 font-medium">Applicants</th>
            <th className="px-6 py-5 font-medium">Recruiter</th>
            <th className="px-6 py-5 font-medium">Status</th>
            <th className="px-6 py-5 font-medium">Skills</th>
          </tr>
        </thead>

        <tbody>
          {positions.map((position) => (
            <motion.tr
              key={position.id}
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={() => onSelect(position)}
              className="cursor-pointer border-b border-border transition-colors hover:bg-surface-hover/80"
            >
              {/* Position */}
              <td className="px-6 py-5">
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {position.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {position.type}
                  </p>
                </div>
              </td>

              {/* Department */}
              <td className="px-6 py-5 text-secondary">
                {position.department}
              </td>

              {/* Location */}
              <td className="px-6 py-5 text-secondary">
                {position.location}
              </td>

              {/* Experience */}
              <td className="px-6 py-5 text-secondary">
                {position.experience}
              </td>

              {/* Applicants */}
              <td className="px-6 py-5">
                <div className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
                  {position.applicants} Applicants
                </div>
              </td>

              {/* Recruiter */}
              <td className="px-6 py-5 text-secondary">
                {position.recruiter}
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    position.status === "Open"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {position.status}
                </span>
              </td>

              {/* Skills */}
              <td className="px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {position.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-violet-100 dark:bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}