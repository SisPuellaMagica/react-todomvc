import React from 'react'
import styles from './index.module.scss'

export default class TodoFooter extends React.Component {
    render() {
        const { allNum, completedNum, toggleAllCompleted, deleteAllCompleted } = this.props
        return (
            <footer className={styles.root}>
                <div className="left">
                    <input
                        type="checkbox"
                        checked={allNum === completedNum && allNum !== 0}
                        onChange={e => toggleAllCompleted(e.target.checked)}
                    />
                    <span>{completedNum} / {allNum}</span>
                </div>
                <div className="right">
                    <button
                        className="delBtn"
                        onClick={() => {
                            if (window.confirm('确认删除吗')) {
                                deleteAllCompleted()
                            }
                        }}
                    >
                        删除所有完成事项
                    </button>
                </div>
            </footer>
        )
    }
}