import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Wrapper>
      <nav className="content flex">
        <NavLink to={"/"}>Tasks</NavLink>
        <NavLink to={"/add-task"}>Add Task</NavLink>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  margin-bottom: 1rem;
  nav {
    padding: 1rem;
  }
`;

export default Nav;
