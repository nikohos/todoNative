import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onAdd: (text: string) => void;
}

export default function TaskInput({ onAdd }: Props) {
  const [text, setText] = useState<string>("");

  const add = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="New task..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={add} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginRight: 10,
  },
});
