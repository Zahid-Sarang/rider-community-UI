import { ComponentType } from "react";
import { NavLink } from "react-router-dom";

interface NavTitleProps {
    url: string;
    title: string;
    Icon: ComponentType;
}

const NavBarLink = ({ url, title, Icon }: NavTitleProps) => {
    return (
        <NavLink
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " text-primary" : "text-secondary"
            }
        >
            <span className="flex rounded-lg leading-6 items-center gap-[0.75rem] p-[0.75rem] text-[0.875rem] font-extrabold text-base relative">
                <span>
                    <Icon />
                </span>
                <span className="max-xl:hidden">{title}</span>
            </span>
        </NavLink>
    );
};

export default NavBarLink;
