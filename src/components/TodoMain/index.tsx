import { useEffect, useRef, useState } from 'react'
import { Todo } from '@/App'
import styles from './index.module.scss'

type PropType = {
    todos: Todo[],
    toggleTodo: (id: string) => void,
    editTodo: (id: string, title: string) => void,
    deleteTodo: (id: string) => void
}

export default function TodoMain({ todos, toggleTodo, editTodo, deleteTodo }: PropType) {
    const [editId, setEditId] = useState('')
    const [editTitle, setEditTitle] = useState('')

    const inputRef = useRef<{ [key: string]: HTMLInputElement }>({})
    useEffect(
        () => {
            inputRef.current[editId]?.focus()
        },
        [editId]
    )

    return (
        <ul className={styles.root}>
            {
                todos.map(todo => (
                    <li key={todo.id}>
                        <div className="left">
                            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                            <span style={{ display: todo.id === editId ? 'none' : '' }}>{todo.title}</span>
                            <input
                                style={{ display: todo.id === editId ? '' : 'none' }}
                                type="text"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                ref={el => inputRef.current[todo.id] = el!}
                                onBlur={
                                    () => {
                                        if (editTitle.trim() === '' || editTitle.trim().length > 20) {
                                            window.alert('输入非法')
                                            setEditId('')
                                            setEditTitle('')
                                            return
                                        }
                                        editTodo(editId, editTitle.trim())
                                        setEditId('')
                                        setEditTitle('')
                                    }
                                }
                            />
                        </div>
                        <div className="right">
                            <button
                                className="editBtn"
                                onClick={() => {
                                    setEditId(todo.id)
                                    setEditTitle(todo.title)
                                }}
                            >
                                编辑
                            </button>
                            <button
                                className="delBtn"
                                onClick={
                                    () => {
                                        if (window.confirm('确认删除吗')) {
                                            deleteTodo(todo.id)
                                        }
                                    }
                                }
                            >
                                删除
                            </button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
