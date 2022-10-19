import { Navbar, Topbar, Rightbar } from "components";

interface LoadingProps {
    variant?: "init" | "page" | "fill";
}

const LoadingSVG = () => {
    return (
        <svg viewBox="0 0 100 100" className="loading-svg">
            <ellipse className="e1" />
            <ellipse className="e2" />
            <ellipse className="e3" />
            <ellipse className="e4" />
            <ellipse className="e5" />
            <ellipse className="e6" />
            <ellipse className="e7" />
            <ellipse className="e8" />
            <ellipse className="e9" />
            <ellipse className="e10" />
            <ellipse className="e11" />
            <ellipse className="e12" />
        </svg>
    );
};

const Loading = ({ variant }: LoadingProps) => {
    if (variant === "init") {
        return (
            <>
                <div className="navbar" />
                <div className="rightbar" />
                <div className="topbar" />
                <main className="loading-page">
                    <LoadingSVG />
                </main>
            </>
        );
    }
    if (variant === "page") {
        return (
            <>
                <Navbar />
                <Rightbar />
                <Topbar />
                <main className="loading-page">
                    <LoadingSVG />
                </main>
            </>
        );
    }

    if (variant === "fill") {
        return (
            <div className="loading-fill theme">
                <LoadingSVG />
            </div>
        );
    }

    return (
        <div className="loading-default theme">
            <LoadingSVG />
        </div>
    );
};

export default Loading;
