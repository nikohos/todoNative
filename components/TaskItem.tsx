import { Pressable, Text, StyleSheet } from 'react-native';
import { Task } from '../App';

interface Props {
  task: Task;
  onToggle: () => void;
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle}>
      <Text style={[styles.text, task.done && styles.done]}>
        {task.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
