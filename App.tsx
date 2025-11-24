import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const json = await AsyncStorage.getItem('@tasks');
      if (json !== null) {
        setTasks(JSON.parse(json));
      }
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const addTask = (text: string) => {
    const newTasks = [...tasks, { id: Date.now(), text, done: false }];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <TaskInput onAdd={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={() => toggleTask(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
