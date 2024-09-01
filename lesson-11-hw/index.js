const users = [
  { userId: 1, name: "Oksana" },
  { userId: 2, name: "Alia" },
  { userId: 3, name: "Kristina" },
  { userId: 4, name: "Vlad" },
  { userId: 5, name: "Kirill" },
  { userId: 6, name: "Andrew" },
];

const tasks = [
  { taskId: 1, userId: 1 },
  { taskId: 2, userId: 1 },
  { taskId: 3, userId: 2 },
  { taskId: 4, userId: 2 },
  { taskId: 5, userId: 2 },
  { taskId: 6, userId: 3 },
  { taskId: 7, userId: 4 },
  { taskId: 8, userId: 4 },
  { taskId: 9, userId: 4 },
  { taskId: 10, userId: 5 },
  { taskId: 11, userId: 5 },
  { taskId: 12, userId: 5 },
  { taskId: 13, userId: 6 },
];

const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
};

const fetchTasksForUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userTasks = tasks.filter((task) => task.userId === userId);
      resolve(userTasks);
    }, 2000);
  });
};

// fetchTasksForUser(2).then((tasks) => console.log(tasks));

const loadUserData = async (taskThreshold) => {
  try {
    const users = await fetchUsers();

    const tasksPromises = users.map((user) => fetchTasksForUser(user.userId));

    const tasksForUsers = await Promise.all(tasksPromises);

    const usersWithTasks = users.map((user, index) => {
      return {
        ...user,
        tasks: tasksForUsers[index],
      };
    });

    const filteredUsers = usersWithTasks.filter(
      (user) => user.tasks.length > taskThreshold
    );

    console.log(filteredUsers);

    return filteredUsers;
  } catch (error) {
    console.error("Ошибка данных:", error);
  }
};

loadUserData(0); // Users у которых 1 и больше  задачи
