import { Link } from "@nextui-org/link";

import { PROFILE_TASKS } from "@/_utils/constant";

export default function ProfileCompletion() {
  return (
    <>
      <div className="flex items-baseline text-gray-900 dark:text-white mb-2">
        <span className="text-5xl font-extrabold tracking-tight text-color-17">
          70%
        </span>
      </div>
      <h5 className="mb-4 text-md font-normal text-color-18">COMPLETE</h5>
      <div className="border-b border-color-19">
        <p className="text-xs text-color-4 font-semibold mb-5">
          You will not be able to request refunds on jobs until your profile is
          at least 75% complete.
        </p>
      </div>
      <ul className="space-y-5 my-7">
        {PROFILE_TASKS.map((task, index) => (
          <li
            key={index}
            className={`flex ${task.completed ? "line-through decoration-color-4" : ""}`}
          >
            <Link
              href="#"
              className={`${task.completed ? "text-base font-normal leading-tight text-color-4" : "text-base font-normal leading-tight"}`}
            >
              {task.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
