import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const allTasks = tasks.map((task) => ({ ...task }));

    const foundedTask = allTasks.find((task) => task.title === newTaskTitle);

    if (foundedTask) {
      return Alert.alert(
        'Task ja cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]
      );
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const existentTask = updatedTasks.find((task) => task.id === taskId);
    if (!existentTask) {
      return;
    }

    existentTask.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const existentTask = updatedTasks.find((task) => task.id === id);
    if (!existentTask) {
      return;
    }
    existentTask.done = !existentTask.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
