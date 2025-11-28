import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add new task"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Add"
        onPress={() => {
          onAdd(text);
          setText('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 5
  }
});
