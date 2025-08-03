import {useSidebarCollapsed} from "../store/uiStore.js";
import {AlertFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Logo = ({
                isAuth,
                path = "/",
                setSelectedKey = null,
                role = 'user'
              }) => {
  const navigate = useNavigate();
  let isSidebarCollapsed;
  const adminSidebarCollapsed = useSidebarCollapsed(state => state.adminSidebarCollapsed);
  const userSidebarCollapsed = useSidebarCollapsed(state => state.userSidebarCollapsed);
  if (role === 'admin') {
    isSidebarCollapsed = adminSidebarCollapsed;
  } else if (role === 'user') {
    isSidebarCollapsed = userSidebarCollapsed;
  }
  return (
    <div className="logo" onClick={() => {
      setSelectedKey(path);
      navigate(path)
    }}>
      <AlertFilled className="logo-icon"/>
      {isAuth ? (
        <h1 className="logo-text">IssueDesk</h1>
      ) : (
        <h1 className={isSidebarCollapsed ? "logo-text collapsed" : "logo-text not-collapsed"}>
          IssueDesk
        </h1>
      )}
    </div>
  );
};

export default Logo;