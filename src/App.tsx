import { useEffect, useMemo, useState } from 'react'
import TodoHeader from '@/components/TodoHeader'
import TodoMain from '@/components/TodoMain'
import TodoFooter from '@/components/TodoFooter'
import styles from './App.module.scss'

export type Todo = {
    id: string,
    title: string,
    completed: boolean
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(
        () => {
            setTodos(JSON.parse(localStorage.getItem('todos') || '[]'))
        },
        []
    )

    useEffect(
        () => {
            localStorage.setItem('todos', JSON.stringify(todos))
        },
        [todos]
    )

    const addTodo = (title: string) => {
        setTodos([
            {
                id: Math.random() + '_' + (+new Date()),
                title,
                completed: false
            },
            ...todos
        ])
    }

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const editTodo = (id: string, title: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title } : todo))
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleAllCompleted = (completed: boolean) => {
        setTodos(todos.map(todo => ({ ...todo, completed })))
    }

    const deleteAllCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed))
    }

    const completedNum = useMemo(
        () => {
            return todos.filter(todo => todo.completed).length
        },
        [todos]
    )

    return (
        <div className={styles.root}>
            <TodoHeader addTodo={addTodo} />
            <TodoMain todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
            <TodoFooter allNum={todos.length} completedNum={completedNum} toggleAllCompleted={toggleAllCompleted} deleteAllCompleted={deleteAllCompleted} />
        </div>
    )
}