import styles from './notFound.module.less'

const NotFound = () => {
  return (
    <section className={styles.container}>
      <span className={styles.codeMessage}>404</span>
      <span className={styles.message}>Not Found</span>
    </section>
  )
}

export default NotFound
