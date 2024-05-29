import style from '@widgets/navBar/ui/index.module.css'

export const NavBar = () => {
  return (
       <nav className={style.menu}>
        <div className={style.border_img}>
          <img src="/src/assets/logo_icon.png" alt="Logo" className={style.logo} />
          <h2 className={style.logo_text}>Staff Viewer</h2>
        </div>
      <ul className={style.list}>
        <li className={style.list_item}>Выход</li>
      </ul>
    </nav>
  )
}
