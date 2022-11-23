import React from 'react'
import styles from './index.module.scss'

export default class TodoMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editId: '',
            editTitle: ''
        }
        this.inputRef = React.createRef()
        this.inputRef.current = {}
    }

    onEdit = (editId, editTitle) => {
        this.setState(
            { editId, editTitle },
            () => this.inputRef.current[editId]?.focus()
        )
    }

    render() {
        const { todos, toggleTodo, editTodo, deleteTodo } = this.props
        const { editId, editTitle } = this.state
        return (
            <ul className={styles.root}>
                {
                    todos.map(todo => (
                        <li key={todo.id}>
                            <div className="left">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                />
                                <span style={{ display: todo.id === editId ? 'none' : '' }}>{todo.title}</span>
                                <input
                                    style={{ display: todo.id === editId ? '' : 'none' }}
                                    type="text"
                                    value={editTitle}
                                    onChange={e => this.setState({ editTitle: e.target.value })}
                                    ref={el => this.inputRef.current[todo.id] = el}
                                    onBlur={() => {
                                        if (editTitle.trim() === '' || editTitle.trim().length > 20) {
                                            window.alert('输入非法')
                                            this.setState({
                                                editId: '',
                                                editTitle: ''
                                            })
                                            return
                                        }
                                        editTodo(editId, editTitle.trim())
                                        this.setState({
                                            editId: '',
                                            editTitle: ''
                                        })
                                    }}
                                />
                            </div>
                            <div className="right">
                                <button className="editBtn" onClick={() => { this.onEdit(todo.id, todo.title) }}>编辑</button>
                                <button
                                    className="delBtn"
                                    onClick={() => {
                                        if (window.confirm('确认删除吗')) {
                                            deleteTodo(todo.id)
                                        }
                                    }}
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
}