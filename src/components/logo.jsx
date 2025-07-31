import {useSidebarCollapsed} from "../store/uiStore.js";
import {AlertFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Logo = ({isAuth}) => {
  const navigate = useNavigate();
  const isSidebarCollapsed = useSidebarCollapsed(state => state.userSidebarCollapsed);

  return (
    <div className="logo" onClick={() => navigate("/")}>
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