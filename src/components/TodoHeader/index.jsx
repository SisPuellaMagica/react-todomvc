import React from 'react'
import styles from './index.module.scss'

export default class TodoHeader extends React.Component {
    state = {
        title: ''
    }

    render() {
        const { addTodo } = this.props
        const { title } = this.state
        return (
            <header className={styles.root}>
                <input
                    type="text"
                    placeholder="请输入待做事项（最多 20 字符）并按回车"
                    value={title}
                    onChange={e => this.setState({ title: e.target.value })}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            if (title.trim() === '') {
                                window.alert('请输入内容')
                                this.setState({ title: '' })
                                return
                            }
                            if (title.trim().length > 20) {
                                window.alert('输入内容过长')
                                this.setState({ title: title.trim() })
                                return
                            }
                            addTodo(title.trim())
                            this.setState({ title: '' })
                            return
                        }
                    }}
                />
            </header>
        )
    }
}