import style from '@widgets/navBar/ui/index.module.css'
export const NavBar = () => {
  return (
    <nav className={style.menu}>
      <img src="/src/assets/logo.png" alt="" className={style.logo} />
      <ul className={style.list}>
        <li className={style.list_item}>Актуальная информация</li>
        <li className={style.list_item}>Документы</li>
        <li className={style.list_item}>О Системе</li>
        <li className={style.list_item}>Выход</li>
        <li className={style.list_item}>Настройки</li>
      </ul>
    </nav>
  )
}
