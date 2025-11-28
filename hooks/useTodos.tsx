import { useReducer } from 'react';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'REMOVE'; payload: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: Date.now(), text: action.payload, done: false }
      ];

    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      );

    case 'REMOVE':
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text: string) => {
    if (text.trim().length > 0) {
      dispatch({ type: 'ADD', payload: text });
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}
