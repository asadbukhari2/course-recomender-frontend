import classes from "./Toolbar.module.css";

import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Cart from "../../UI/Cart/Cart";
import DrawerToggle from "../Side Drawer/DrawerToggle/DrawerToggle";

function Toolbar(props) {
  // const [toolbarShow, setToolbarShow] = useState(classes.Toolbar)

  // const prev = useRef(window.scrollY)

  // const handleScroll = (e) => {
  //     const window = e.currentTarget
  //     prev.current = window.scrollY
  // }

  // useEffect(() => {
  //     window.addEventListener('scroll', e => handleScroll(e))
  // }, [])

  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      {!props.isSideDrawerVisible && (
        <div className={classes.Logo}>
          <Logo />
        </div>
      )}

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>

      <Cart />
    </header>
  );
}

export default Toolbar;
