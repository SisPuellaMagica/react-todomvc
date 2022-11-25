import styles from './index.module.scss'

type PropType = {
    allNum: number,
    completedNum: number,
    toggleAllCompleted: (completed: boolean) => void,
    deleteAllCompleted: () => void
}

export default function TodoFooter({ allNum, completedNum, toggleAllCompleted, deleteAllCompleted }: PropType) {
    return (
        <footer className={styles.root}>
            <div className="left">
                <input
                    type="checkbox"
                    checked={completedNum === allNum && allNum !== 0}
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