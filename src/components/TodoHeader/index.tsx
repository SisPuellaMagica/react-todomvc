import { useState } from 'react'
import styles from './index.module.scss'

type PropType = {
    addTodo: (title: string) => void
}

export default function TodoHeader({ addTodo }: PropType) {
    const [title, setTitle] = useState('')

    return (
        <header className={styles.root}>
            <input
                type="text"
                placeholder="请输入待做事项（最多 20 字符）并按回车"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyUp={e => {
                    if (e.key === 'Enter') {
                        if (title.trim() === '') {
                            window.alert('请输入内容')
                            setTitle('')
                            return
                        }
                        if (title.trim().length > 20) {
                            window.alert('输入内容过长')
                            setTitle(title.trim())
                            return
                        }
                        addTodo(title.trim())
                        setTitle('')
                    }
                }}
            />
        </header>
    )
}