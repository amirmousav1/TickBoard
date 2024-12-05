import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialTasks = [
  { id: 2, name: "Study React", priority: "Medium", type: "todo" },
  { id: 1, name: "Learn Javascipt", priority: "High", type: "todo" },
];
const priorityOrder = { High: 1, Medium: 2, Low: 3 };

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || initialTasks;
  });
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [isSortByPriority, setIsSortByPriority] = useState(true);
  const todoTasks = tasks.filter((task) => task.type === "todo");
  const doneTasks = tasks.filter((task) => task.type === "done");

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  const sortedTasks = isSortByPriority
    ? [...todoTasks].sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    : todoTasks;

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskName || !priority) {
      toast.error("Task Name and Priority are required!");
      return;
    }
    setTasks((cur) => [
      ...cur,
      { id: Date.now(), name: taskName, priority: priority, type: "todo" },
    ]);
    toast.success("Task added successfully!");
    setTaskName("");
    setPriority("");
  }

  function handleDelete(id) {
    setTasks((cur) => cur.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  }

  function handleDoTask(id) {
    setTasks((cur) =>
      cur.map((task) => (task.id === id ? { ...task, type: "done" } : task))
    );
    toast.success("Task marked as done!");
  }

  function handleClearDoneTasks() {
    setTasks((cur) => cur.filter((task) => task.type !== "done"));
    toast.success("All done tasks cleared!");
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="font-Inter min-h-dvh flex flex-col justify-center items-center bg-primary">
        <div className="w-full sm:w-[583px] flex-1 sm:flex-none sm:rounded-[20px] py-12 px-3 sm:px-16 bg-secondary">
          <form className="sm:flex sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              type="text"
              className="bg-secondary border w-full mb-3 sm:w-auto border-light rounded-[10px] h-[40px] focus:outline-none flex-1 px-4 text-[#777777] placeholder:text-[#777777]"
              placeholder="Add a new task"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-secondary border mb-3 w-full sm:w-auto border-light rounded-[10px] h-[40px] focus:outline-none flex-1 px-4 text-[#777777] placeholder:text-[#777777]"
            >
              <option value="" disabled hidden>
                Priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button className="bg-light h-10 flex w-full items-center justify-center rounded-[10px] sm:w-10 focus:outline-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 12C24 12.2652 23.8946 12.5196 23.7071 12.7071C23.5196 12.8946 23.2652 13 23 13H13V23C13 23.2652 12.8946 23.5196 12.7071 23.7071C12.5196 23.8946 12.2652 24 12 24C11.7348 24 11.4804 23.8946 11.2929 23.7071C11.1054 23.5196 11 23.2652 11 23V13H1C0.734784 13 0.48043 12.8946 0.292893 12.7071C0.105357 12.5196 0 12.2652 0 12C0 11.7348 0.105357 11.4804 0.292893 11.2929C0.48043 11.1054 0.734784 11 1 11H11V1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V11H23C23.2652 11 23.5196 11.1054 23.7071 11.2929C23.8946 11.4804 24 11.7348 24 12Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
          <div className="mt-10">
            <div className="flex justify-between">
              <h4 className="text-white">Tasks to do - {sortedTasks.length}</h4>
              <div className="flex gap-[6px] items-center">
                <label className="text-white" htmlFor="sortbypriority">
                  Sort by Priority
                </label>
                <input
                  id="sortbypriority"
                  className="w-5 h-5 accent-[#15101C]"
                  type="checkbox"
                  checked={isSortByPriority}
                  onChange={() => setIsSortByPriority((cur) => !cur)}
                />
              </div>
            </div>
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center px-3 sm:px-5 bg-[#15101C] h-[75px] rounded-[10px] mt-4 sm:gap-5"
              >
                <span className="text-light flex-1 flex justify-between text-sm">
                  {task.name}
                </span>
                <div className="flex gap-4 sm:gap-5">
                  <span
                    className={`${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-orange-500"
                        : "bg-green-700"
                    } text-white py-1 px-2 text-xs rounded-[10px]`}
                  >
                    {task.priority}
                  </span>
                  <button onClick={() => handleDoTask(task.id)}>
                    <svg
                      width="18"
                      height="13"
                      viewBox="0 0 18 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.7851 1.67391L6.78513 12.6739C6.72128 12.7378 6.64546 12.7885 6.56199 12.8231C6.47853 12.8577 6.38907 12.8755 6.29872 12.8755C6.20837 12.8755 6.11891 12.8577 6.03545 12.8231C5.95199 12.7885 5.87617 12.7378 5.81232 12.6739L0.999816 7.86141C0.870813 7.7324 0.79834 7.55744 0.79834 7.375C0.79834 7.19256 0.870813 7.0176 0.999816 6.88859C1.12882 6.75959 1.30378 6.68712 1.48622 6.68712C1.66866 6.68712 1.84363 6.75959 1.97263 6.88859L6.29872 11.2155L16.8123 0.701094C16.9413 0.572091 17.1163 0.499619 17.2987 0.499619C17.4812 0.499619 17.6561 0.572091 17.7851 0.701094C17.9141 0.830097 17.9866 1.00506 17.9866 1.1875C17.9866 1.36994 17.9141 1.5449 17.7851 1.67391Z"
                        fill="#9E78CF"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6112 3.125H1.48622C1.30388 3.125 1.12902 3.19743 1.00009 3.32636C0.871154 3.4553 0.798721 3.63016 0.798721 3.8125C0.798721 3.99484 0.871154 4.1697 1.00009 4.29864C1.12902 4.42757 1.30388 4.5 1.48622 4.5H2.17372V16.875C2.17372 17.2397 2.31859 17.5894 2.57645 17.8473C2.83431 18.1051 3.18405 18.25 3.54872 18.25H14.5487C14.9134 18.25 15.2631 18.1051 15.521 17.8473C15.7789 17.5894 15.9237 17.2397 15.9237 16.875V4.5H16.6112C16.7936 4.5 16.9684 4.42757 17.0974 4.29864C17.2263 4.1697 17.2987 3.99484 17.2987 3.8125C17.2987 3.63016 17.2263 3.4553 17.0974 3.32636C16.9684 3.19743 16.7936 3.125 16.6112 3.125ZM14.5487 16.875H3.54872V4.5H14.5487V16.875ZM4.92372 1.0625C4.92372 0.880164 4.99615 0.705295 5.12509 0.576364C5.25402 0.447433 5.42888 0.375 5.61122 0.375H12.4862C12.6686 0.375 12.8434 0.447433 12.9724 0.576364C13.1013 0.705295 13.1737 0.880164 13.1737 1.0625C13.1737 1.24484 13.1013 1.4197 12.9724 1.54864C12.8434 1.67757 12.6686 1.75 12.4862 1.75H5.61122C5.42888 1.75 5.25402 1.67757 5.12509 1.54864C4.99615 1.4197 4.92372 1.24484 4.92372 1.0625Z"
                        fill="#9E78CF"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h4 className="text-white">Done - {doneTasks.length}</h4>
              {doneTasks.length !== 0 && (
                <button
                  onClick={handleClearDoneTasks}
                  className="bg-green-700 text-white rounded-[10px] py-1 px-2 text-sm"
                >
                  Clear Done Tasks
                </button>
              )}
            </div>
            {doneTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center px-5 bg-[#15101C] h-[75px] rounded-[10px] mt-4 gap-5"
              >
                <del className="text-[#78CFB0] flex-1 flex justify-between">
                  {task.name}
                </del>
                <div className="flex gap-5">
                  <button onClick={() => handleDelete(task.id)}>
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6112 3.125H1.48622C1.30388 3.125 1.12902 3.19743 1.00009 3.32636C0.871154 3.4553 0.798721 3.63016 0.798721 3.8125C0.798721 3.99484 0.871154 4.1697 1.00009 4.29864C1.12902 4.42757 1.30388 4.5 1.48622 4.5H2.17372V16.875C2.17372 17.2397 2.31859 17.5894 2.57645 17.8473C2.83431 18.1051 3.18405 18.25 3.54872 18.25H14.5487C14.9134 18.25 15.2631 18.1051 15.521 17.8473C15.7789 17.5894 15.9237 17.2397 15.9237 16.875V4.5H16.6112C16.7936 4.5 16.9684 4.42757 17.0974 4.29864C17.2263 4.1697 17.2987 3.99484 17.2987 3.8125C17.2987 3.63016 17.2263 3.4553 17.0974 3.32636C16.9684 3.19743 16.7936 3.125 16.6112 3.125ZM14.5487 16.875H3.54872V4.5H14.5487V16.875ZM4.92372 1.0625C4.92372 0.880164 4.99615 0.705295 5.12509 0.576364C5.25402 0.447433 5.42888 0.375 5.61122 0.375H12.4862C12.6686 0.375 12.8434 0.447433 12.9724 0.576364C13.1013 0.705295 13.1737 0.880164 13.1737 1.0625C13.1737 1.24484 13.1013 1.4197 12.9724 1.54864C12.8434 1.67757 12.6686 1.75 12.4862 1.75H5.61122C5.42888 1.75 5.25402 1.67757 5.12509 1.54864C4.99615 1.4197 4.92372 1.24484 4.92372 1.0625Z"
                        fill="#9E78CF"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
