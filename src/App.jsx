import React from 'react'
import TodoHeader from '@/components/TodoHeader'
import TodoMain from '@/components/TodoMain'
import TodoFooter from '@/components/TodoFooter'
import styles from './App.module.scss'

export default class App extends React.Component {
    state = {
        todos: []
    }

    addTodo = title => {
        const todo = {
            id: Math.random() + '_' + (+new Date()),
            title,
            completed: false
        }
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleTodo = id => {
        this.setState({
            todos: this.state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        })
    }

    editTodo = (id, title) => {
        this.setState({
            todos: this.state.todos.map(todo => todo.id === id ? { ...todo, title } : todo)
        })
    }

    deleteTodo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    toggleAllCompleted = completed => {
        this.setState({
            todos: this.state.todos.map(todo => ({ ...todo, completed }))
        })
    }

    deleteAllCompleted = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.completed)
        })
    }

    getCompletedNum = () => this.state.todos.filter(todo => todo.completed).length

    render() {
        return (
            <div className={styles.root}>
                <TodoHeader addTodo={this.addTodo} />
                <TodoMain todos={this.state.todos} toggleTodo={this.toggleTodo} editTodo={this.editTodo} deleteTodo={this.deleteTodo} />
                <TodoFooter allNum={this.state.todos.length} completedNum={this.getCompletedNum()} toggleAllCompleted={this.toggleAllCompleted} deleteAllCompleted={this.deleteAllCompleted} />
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            todos: JSON.parse(localStorage.getItem('todos')) || []
        })
    }

    componentDidUpdate() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
}